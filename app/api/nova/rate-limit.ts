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
