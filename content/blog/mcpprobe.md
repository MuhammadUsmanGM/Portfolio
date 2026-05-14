---
title: "MCPProbe: Building a Diagnostic Layer for the Model Context Protocol"
date: "2026-05-01"
category: "AI Architecture"
readTime: "6 min read"
---

When the Model Context Protocol became the de facto standard for AI-to-tool communication in 2025, the ecosystem around it grew fast. Servers proliferated. Clients multiplied. And a new class of problem emerged that nobody had built tooling for yet: how do you know if an MCP server is actually working?

Not "does it respond to a ping" working. Actually working — tools discoverable, schemas valid, client compatibility confirmed, production config ready to paste.

That gap is what MCPProbe is for.

---

## The Problem Nobody Had Tooled

By early 2026, connecting an AI client to an MCP server had become a standard operation. Claude Code, Cursor, Windsurf, and a dozen other clients all spoke the protocol. The NPM registry had hundreds of MCP server packages.

But the workflow for verifying a server looked like this: add it to your config file, restart your client, ask the AI a question that should use the tool, and observe whether it worked. If it didn't, you were debugging blind — no structured way to know whether the server failed to start, failed to expose its tools, returned malformed schemas, or was simply incompatible with your specific client.

This is the equivalent of testing a REST API by writing a frontend and seeing if the button works.

MCPProbe is the equivalent of curl, Postman, and a health dashboard — for MCP.

---

## What MCPProbe Actually Does

MCPProbe connects to any MCP server (local or remote, stdio or SSE transport) and runs a structured diagnostic sequence:

**Tool Discovery** — queries `tools/list` and returns every tool the server exposes with its name, description, and full input schema. No more guessing what tools are available by reading a README.

**Schema Validation** — validates each tool's input schema against the JSON Schema spec. Servers with malformed schemas fail silently in production clients; MCPProbe surfaces them immediately.

**Health Scoring** — generates a 0-100 health score based on tool count, schema validity, response latency, and transport reliability. A server with valid schemas, fast responses, and clean transport gets a high score. A server that drops connections or returns invalid JSON gets flagged.

**Client Compatibility Matrix** — checks the server against the capability expectations of 13 known MCP clients and reports which ones will work correctly and which will have issues.

**Config Generation** — outputs a ready-to-paste configuration block for Claude Code, Cursor, Windsurf, or a generic MCP client, correctly populated with the server URL and transport settings.

The entire diagnostic runs in under 3 seconds for a healthy local server.

---

## The Architecture: SDK-First, Spec-Strict

MCPProbe is built on top of `@modelcontextprotocol/sdk` — Anthropic's official TypeScript SDK for the protocol. This was a deliberate choice over implementing the protocol from scratch.

The MCP spec is still evolving. New transport types, new primitive types, new capability negotiation patterns — these are being added as the ecosystem matures. Building on the official SDK means MCPProbe inherits spec compliance for free rather than having to track spec changes manually.

The probe sequence itself is implemented as a pipeline of validators:

```typescript
async function runDiagnostic(serverUrl: string): Promise<DiagnosticReport> {
  const client = await MCPClient.connect(serverUrl);

  const [tools, resources, prompts] = await Promise.all([
    client.listTools(),
    client.listResources(),
    client.listPrompts()
  ]);

  const schemaResults = tools.map(tool =>
    validateJsonSchema(tool.inputSchema)
  );

  const healthScore = computeHealthScore({
    toolCount: tools.length,
    schemaValidity: schemaResults,
    latency: client.lastRoundTripMs,
    transport: client.transportType
  });

  return {
    tools,
    resources,
    prompts,
    schemaResults,
    healthScore,
    compatibilityMatrix: checkClientCompatibility(tools, client.capabilities),
    generatedConfigs: generateConfigs(serverUrl, client.transportType)
  };
}
```

The output is structured JSON that can be consumed programmatically or pretty-printed to the terminal.

---

## The Compatibility Matrix: Harder Than It Sounds

The client compatibility matrix was the most research-intensive part of MCPProbe to build. The MCP spec defines what servers must expose. It does not define how clients must handle edge cases — what happens when a tool has no description, when an input schema uses a JSON Schema feature the client doesn't support, when the server advertises capabilities the client doesn't recognize.

I collected this information empirically: connecting to the same test server from 13 different MCP clients and recording exactly where each one diverged from the expected behavior. The compatibility matrix in MCPProbe encodes those observations as rules applied to the server's diagnostic output.

Examples of what the matrix catches:

- Claude Code handles tools with empty `description` fields correctly; two other clients silently drop those tools from the tool list
- Several clients don't support the `anyOf` JSON Schema combinator in tool input schemas, causing schema validation to silently fail
- SSE transport with long-lived connections triggers keepalive issues in certain client implementations that don't send heartbeats

None of this is documented anywhere. It's tribal knowledge accumulated by people who hit the issues in production. MCPProbe makes it systematic.

---

## Using MCPProbe in a Real Workflow

The simplest invocation probes a local server on the default stdio transport:

```bash
npx mcpprobe probe --server "node /path/to/server.js"
```

For a remote SSE server:

```bash
npx mcpprobe probe --url "https://my-mcp-server.example.com/sse"
```

The output looks like this:

```
MCPProbe v1.0.0 — Diagnostic Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Health Score: 94/100

Tools (4 discovered):
  ✓ search_codebase       — schema valid, latency 12ms
  ✓ refine_prompt         — schema valid, latency 8ms
  ✓ get_conventions       — schema valid, latency 9ms
  ✗ list_dependencies     — schema invalid: 'anyOf' not supported

Client Compatibility:
  ✓ Claude Code           — fully compatible
  ✓ Cursor                — fully compatible
  ⚠ Windsurf             — list_dependencies schema may not render
  ✓ Generic MCP Client    — compatible (3/4 tools)

Generated Config (Claude Code):
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/server.js"]
    }
  }
}
```

The `-4` on the health score is because `list_dependencies` has a schema issue. Fix the schema, re-probe, score goes to 100.

---

## What This Reveals About MCP Adoption

Building MCPProbe exposed something interesting about where the MCP ecosystem is right now: the protocol itself is solid, but the tooling layer around it is immature in the way that all new protocol ecosystems are immature. The equivalent of `curl` didn't exist. The equivalent of a compatibility matrix didn't exist. The equivalent of a health dashboard didn't exist.

These things always get built eventually. Every widely adopted protocol accumulates diagnostic tooling — HTTP has curl and Postman and Wireshark, gRPC has grpcurl and Evans, GraphQL has Altair and GraphiQL. MCP is early enough that building these tools is a genuine contribution, not redundant work.

The pattern I've noticed: the protocols that become infrastructure are the ones that accumulate rich tooling ecosystems around them fastest. Anthropic donating MCP to the Agentic AI Foundation under the Linux Foundation in December 2025 signals that this is intended to be infrastructure. The tooling needs to follow.

MCPProbe is one piece of that.

---

## What's Next

The two extensions I'm most interested in building:

**Continuous monitoring** — rather than a one-shot probe, a daemon that polls your MCP servers on a schedule and alerts you when health scores drop or tool schemas change unexpectedly. For production deployments where MCP servers are updated independently of the AI clients using them, this catches regressions before they affect users.

**Diff mode** — compare the tool output of two versions of the same server to detect breaking changes in schemas or missing tools. Useful for server authors who want to verify that a new release is backward compatible with clients already deployed against the old version.

The diagnostic layer is never the glamorous part of an ecosystem. It's also the part that determines whether the ecosystem actually works in production.

---

*MCPProbe is open source and available on NPM. Run with `npx mcpprobe probe`. Full documentation and source on [GitHub](https://github.com/MuhammadUsmanGM/McpProbe).*
