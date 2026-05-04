import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

    const { data, content } = matter(fileContents);
    
    // Generate an excerpt from the first paragraph of content if not provided
    const excerptMatch = content.match(/^[^#\n].+/m);
    const excerpt = data.excerpt || (excerptMatch ? excerptMatch[0].slice(0, 160) + "..." : "");

    return {
      slug,
      title: data.title || slug,
      tag: data.tag || data.category || "Article",
      date: data.date || "Unknown",
      readTime: data.readTime || "5 min read",
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
