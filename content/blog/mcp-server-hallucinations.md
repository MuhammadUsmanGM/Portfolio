# How I Built an MCP Server That Reduced AI Hallucinations by 40%

**Category:** AI Architecture
**Date:** February 5, 2026
**Read Time:** 6 min read

---

In early 2026, AI coding agents are everywhere. Claude Code, Cursor, Gemini CLI — every serious developer has at least one installed. They write boilerplate, refactor modules, explain unfamiliar code. And yet, anyone who has used them seriously for more than a few weeks has experienced the same frustrating pattern: the agent confidently generates code that imports a module that doesn't exist in your project, uses an internal function with the wrong signature, or restructures a file in a way that breaks six other things that depend on it.

This isn't a hallucination in the dramatic sense — the agent isn't inventing entire APIs out of thin air. It's something more subtle and in some ways more dangerous: the agent is working from *general* knowledge when it needs to be working from *specific* knowledge about your project. I call this the **Ground Truth Gap**, and it's the primary reason AI coding agents fail on non-trivial refactoring tasks.

**Promptly** is the MCP server I built to close that gap. Here's exactly how it works, why the approach reduced hallucinations by 40% in my own workflows, and what I learned about the Model Context Protocol in the process.

---

## What Is the Ground Truth Gap

When you ask Claude Code to refactor your authentication module, it brings two things to the task: its training data (which includes millions of authentication implementations from open-source projects) and whatever context you've given it in the current conversation (usually a few file contents you've pasted in or that it's read itself).

The problem is that your codebase is not a generic authentication implementation. It has specific naming conventions. Its interfaces expect specific types. It imports from specific internal packages with specific APIs. It follows specific patterns established by the first developer who worked on it.

The model doesn't know any of this. It infers it from context, and when the context is incomplete — which it always is at scale — it fills the gaps with statistical probability. That statistical probability is drawn from the open-source code it trained on, not from your project.

The result: generated code that looks plausible, passes a quick glance, but breaks on integration because it assumed your `UserService` has a `findById` method when yours is actually `getUserById`, or because it tried to import from `@/utils/auth` when your project uses `@/lib/authentication`.

A 2025 study examining 300 AI-generated projects found that only 68.3% were reproducible without manual intervention. The researchers identified the root cause as the same gap I'm describing: LLMs generate code that's locally correct but globally inconsistent with the execution environment it needs to run in.

---

## What Is MCP and Why Does It Matter Here

The **Model Context Protocol** (MCP) was introduced by Anthropic in late 2024 and has since become one of the most significant architectural developments in the AI tooling space. In March 2025, OpenAI officially adopted it. By December 2025, Anthropic donated the protocol to the Agentic AI Foundation under the Linux Foundation, co-founded with Block and OpenAI. It is becoming the standard "nerve system" for AI-to-tool communication.

Before MCP, integrating an AI model with external data required custom implementations for every combination of model and data source. This is the famous **N×M problem**: N models times M tools equals an enormous amount of bespoke integration code.

MCP solves this by defining a standardized protocol over JSON-RPC 2.0. An MCP server exposes three types of primitives:

- **Resources**: data that can be read (files, database records, API responses)
- **Tools**: functions the AI can call to perform actions
- **Prompts**: templated instructions that can be dynamically assembled

An AI client (Claude Code, Cursor, etc.) connects to one or more MCP servers and can access all their resources and tools through a single standardized interface. The key property for hallucination reduction: the AI can now query your MCP server for ground truth about your specific project *at the moment it needs that information*, rather than relying on stale context or statistical inference.

As the Cloud Security Alliance described it: MCP provides "a structured and auditable way to inject knowledge and state" that "turns stateless models into stateful, situationally aware assistants."

---

## How Promptly Works

Promptly is an MCP server written in TypeScript that runs locally alongside your IDE. When you ask your AI coding agent a question about your codebase, the agent can query Promptly for real-time structural information before generating its response.

The server exposes four primary resources:

### 1. Codebase Structure Map

```typescript
server.resource(
  "codebase://structure",
  "Complete architectural map of the current project",
  async (uri) => {
    const analyzer = new CodebaseAnalyzer(process.cwd());
    const blueprint = await analyzer.identifyBoundaries();

    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(blueprint, null, 2),
        mimeType: "application/json"
      }]
    };
  }
);
```

The `CodebaseAnalyzer` walks your project directory, parses package manifests, identifies entry points, maps internal module boundaries, and extracts naming conventions. The full structural map is injected directly into the model's context before it begins generating code.

### 2. Dependency Graph

```typescript
server.resource(
  "codebase://dependencies",
  "Internal dependency graph with import paths",
  async (uri) => {
    const graph = await buildDependencyGraph(process.cwd());

    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(graph, null, 2),
        mimeType: "application/json"
      }]
    };
  }
);
```

This tells the model exactly which internal modules exist, how they import from each other, and which external packages are actually installed. No more importing from paths that don't exist.

### 3. Agent-Specific Refinement Tool

```typescript
server.tool(
  "refine_prompt",
  "Refine a coding prompt with project-specific constraints",
  {
    prompt: z.string(),
    target_agent: z.enum(["claude-code", "cursor", "gemini", "qwen"]),
    affected_files: z.array(z.string()).optional()
  },
  async ({ prompt, target_agent, affected_files }) => {
    const conventions = await extractConventions(process.cwd());
    const relevantContext = await getRelevantContext(affected_files);
    const agentRules = AGENT_RULES[target_agent];

    const refinedPrompt = applyConstraints(prompt, {
      conventions,
      relevantContext,
      agentRules
    });

    return {
      content: [{
        type: "text",
        text: refinedPrompt
      }]
    };
  }
);
```

Different AI agents have different strengths and tendencies. Claude Code handles multi-file refactoring better when you explicitly list the files that should not be modified. Cursor responds better to imperative constraints than declarative descriptions. The refinement tool applies agent-specific rules on top of project-specific context.

### 4. Intelligent Caching

Analyzing your entire codebase on every query would be too slow to be useful. Promptly implements a file-hash-based cache:

```typescript
async function getCachedStructure(): Promise<ProjectBlueprint> {
  const manifestHash = await hashFile("package.json");
  const tsconfigHash = await hashFile("tsconfig.json");
  const cacheKey = `${manifestHash}-${tsconfigHash}`;

  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  const fresh = await buildStructure();
  await cache.set(cacheKey, fresh);
  return fresh;
}
```

The cache is invalidated when `package.json` or `tsconfig.json` change — the files most likely to indicate a structural change in the project. In practice, the cached structure is served in under 5ms, and a fresh analysis completes in under 50ms even on large monorepos.

---

## The Setup: Zero-Friction Configuration

One of the design principles I held throughout development was that a developer tool failing to install or configure correctly is the same as a developer tool not existing. If it takes more than two minutes to set up, most developers won't do it.

Promptly ships with an automated setup wizard:

```bash
npm install -g @promptly-ai/cli
promptly init
```

The `init` command detects your IDE (Claude Code, Cursor, or a generic MCP-compatible client) and writes the appropriate configuration:

**For Claude Code** (`~/.claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "promptly": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@promptly-ai/cli/dist/server.js"],
      "env": {
        "PROMPTLY_PROJECT_ROOT": "${workspaceFolder}"
      }
    }
  }
}
```

**For project-level configuration** (`.promptly/config.json`):
```json
{
  "agent": "claude-code",
  "cacheStrategy": "manifest-hash",
  "conventions": {
    "autoDetect": true,
    "overrides": {}
  }
}
```

The entire setup process takes under 90 seconds. The server starts automatically when you open your IDE and runs silently in the background.

---

## The Results: Where the 40% Number Comes From

The 40% reduction in logic errors is not a number I pulled from a single benchmark. It comes from three months of personal tracking across production-level refactoring tasks.

My methodology was straightforward: for each significant refactoring task, I ran it twice — once with Promptly providing structural context, once without. I counted "logic errors" as instances where the generated code referenced non-existent internal imports, used incorrect function signatures for internal APIs, or violated project-specific naming conventions in ways that required manual correction before the code would run.

Without Promptly, these errors occurred in approximately 6 out of every 10 non-trivial refactoring requests. With Promptly injecting the structural map and dependency graph, that rate dropped to roughly 3.5 out of 10. That is approximately a 40% reduction.

The pattern was most pronounced in two scenarios:

**Large module refactors** — tasks that required understanding how one module's API was consumed by multiple others. Without the dependency graph, the agent frequently broke downstream consumers. With it, it could see the consumption patterns and preserve backward compatibility.

**Naming convention enforcement** — projects with consistent naming patterns (e.g., all service methods are `verb + Noun`, all interfaces are prefixed with `I`) saw the largest improvements because the convention analysis tool gave the agent an explicit ruleset to follow rather than inferring conventions from a small sample.

---

## What MCP Gets Right That Prompt Engineering Gets Wrong

The naive solution to the Ground Truth Gap is to paste more context into your prompt. Copy the contents of your `package.json`, paste in the relevant module files, describe your naming conventions in plain English. This works — for small projects and simple tasks.

The problem is that prompts are finite. Every token you spend on structural context is a token you can't spend on the actual task. And more importantly, manually assembling context for every request is friction that compounds over time. You start skipping it on "simple" requests, and those are often the requests that produce the most subtly broken code.

MCP solves this at the protocol level. The structural context is not part of your prompt — it is a separate channel that the AI can query when it needs it. The model decides what context it needs for a given task and fetches it specifically, rather than receiving a static blob of context that may or may not be relevant.

This is the architectural insight that makes MCP the right foundation for developer tooling: **context should be dynamic and on-demand, not static and pre-assembled**.

---

## What I'd Build Next

The current version of Promptly provides read-only structural context. The natural extension is bidirectional: the MCP server could also validate generated code against project constraints before the developer sees it, flagging violations of naming conventions or incorrect imports before they become bugs to debug.

A second extension would be semantic search over the codebase — not just structural maps, but the ability to ask "which parts of this codebase handle authentication?" and get a semantically relevant answer. This would require embedding the codebase into a vector store, which is a different class of problem but a natural evolution of what Promptly already does.

The underlying principle doesn't change: the quality of AI-generated code is determined by the quality of context provided to the model. The more precisely you can specify the ground truth of your specific project, the more accurately the model will operate within it.

---

*Promptly is open source and available on NPM. The full server implementation, including the CodebaseAnalyzer and refinement pipeline, is available on [GitHub](https://github.com/MuhammadUsmanGM/promptly). Install with `npm install -g @promptly-ai/cli`.*
