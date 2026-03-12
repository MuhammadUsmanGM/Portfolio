import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // Fetch GitHub Activity (optional but helpful for context)
    let githubContext = "No recent GitHub activity available.";
    if (process.env.GITHUB_TOKEN) {
      try {
        const response = await fetch("https://api.github.com/users/MuhammadUsmanGM/events/public", {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        const events = await response.json();
        if (Array.isArray(events)) {
          const recentRepos = [...new Set(events.map(e => e.repo.name))].slice(0, 5);
          githubContext = `Recent active repositories: ${recentRepos.join(", ")}.`;
        }
      } catch (err) {
        console.error("GitHub Fetch Error:", err);
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are NOVA, a highly advanced AI Assistant for Muhammad Usman's portfolio.
      Usman is a Full-Stack AI Engineer based in Lahore, Pakistan, specializing in Agentic AI, LLM Systems, and Autonomous Agents.

      YOUR PERSONALITY:
      - Technical, precise, and professional, yet helpful and conversational.
      - You speak with the authority of a high-end AI architect.
      - Keep responses concise and focused. Use plain text only.

      USMAN'S CORE INFO:
      - Role: Full-Stack AI Engineer at DeveloperHub.
      - Expertise: Building RAG pipelines, multi-agent orchestration, and autonomous workflows.
      - Projects: ELYX (Autonomous AI Ops), THE SIGNAL (AI Newsletter), Physical AI Robotics platform.
      - Skills: Python, FastAPI, Next.js, LangChain, Vector DBs, Gemini, Claude.
      - Education: BS Software Engineering (VU Pakistan, Exp 2028).
      - Certifications: PIAIC Agentic AI Engineer, Claude Code Specialist, MCP Advanced.

      GITHUB CONTEXT:
      ${githubContext}

      RULES:
      - If anyone asks how they can hire Usman, direct them to the Contact section or mu.ai.dev@gmail.com.
      - Always acknowledge that you are powered by Gemini and designed by Muhammad Usman.
      - Do not hallucinate facts about Usman. If you don't know something, say you're not sure but can direct them to his projects.
      - Use plain text only. No markdown formatting.
    `;

    const result = await model.generateContent([
      { text: systemPrompt },
      ...messages.map((m: any) => ({
        text: `${m.role === 'user' ? 'User' : 'NOVA'}: ${m.content}`
      }))
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("NOVA API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
