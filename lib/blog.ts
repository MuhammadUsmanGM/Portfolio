import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  excerpt: string;
  content: string;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Custom parser for the user's markdown format
    // Format:
    // # Title
    // **Category:** Tag
    // **Date:** Date
    // **Read Time:** ReadTime
    // ---
    // Content

    const lines = fileContents.split("\n");
    let title = "";
    let tag = "";
    let date = "";
    let readTime = "";
    let contentStartLine = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("# ")) {
        title = line.replace("# ", "");
      } else if (line.startsWith("**Category:**")) {
        tag = line.replace("**Category:**", "").trim();
      } else if (line.startsWith("**Date:**")) {
        date = line.replace("**Date:**", "").trim();
      } else if (line.startsWith("**Read Time:**")) {
        readTime = line.replace("**Read Time:**", "").trim();
      } else if (line === "---") {
        contentStartLine = i + 1;
        break;
      }
    }

    const content = lines.slice(contentStartLine).join("\n").trim();
    
    // Generate an excerpt from the first paragraph of content
    const excerptMatch = content.match(/^[^#\n].+/m);
    const excerpt = excerptMatch ? excerptMatch[0].slice(0, 160) + "..." : "";

    return {
      slug,
      title: title || slug,
      tag: tag || "Article",
      date: date || "Unknown",
      readTime: readTime || "5 min read",
      excerpt,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPost => post !== null)
    // Sort posts by date (descending)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return allPostsData;
}
