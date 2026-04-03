import { LRUCache } from "lru-cache";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const tokenCache = new LRUCache<string, number>({
  max: 500,
  ttl: 60 * 1000, // 1 minute
});

/**
 * Extract the most trustworthy client IP from request headers.
 *
 * Priority:
 * 1. x-real-ip — set by Vercel/Nginx from the actual TCP connection, not spoofable.
 * 2. x-forwarded-for — only the FIRST entry (the one appended by the edge proxy).
 *    On Vercel, the rightmost entry is the client IP added by the edge, but the
 *    leftmost is also reliable when there is a single trusted proxy.
 *    We take the rightmost (last) value which is the one added by the trusted proxy.
 * 3. Fallback to "anonymous" — applies a shared global bucket so unknown callers
 *    still get rate-limited collectively rather than bypassing entirely.
 */
export function getClientIp(headerGetter: (name: string) => string | null): string {
  // x-real-ip is set by Vercel from the TCP connection — most reliable
  const realIp = headerGetter("x-real-ip");
  if (realIp) return realIp.trim();

  // x-forwarded-for: take the LAST entry (added by the trusted edge proxy)
  const forwarded = headerGetter("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    const proxyIp = parts[parts.length - 1].trim();
    if (proxyIp) return proxyIp;
  }

  return "anonymous";
}

export function rateLimit(identifier: string, limit: number = 5): RateLimitResult {
  const currentUsage = tokenCache.get(identifier) || 0;

  if (currentUsage >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: 60,
    };
  }

  tokenCache.set(identifier, currentUsage + 1);

  return {
    success: true,
    limit,
    remaining: limit - (currentUsage + 1),
    reset: 60,
  };
}
