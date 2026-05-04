import fs from "fs"; 
import path from "path";	
import matter from "gray-matter"; 
 
const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" }); 
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
     
    // Fallback parsing for the user's previous custom format if YAML frontmatter is missing 
    let finalTitle = data.title; 
    let finalTag = data.tag || data.category; 
    let finalDate = data.date; 
    let finalReadTime = data.readTime; 
 
    if (Object.keys(data).length === 0) { 
      const lines = fileContents.split("\n"); 
      for (const line of lines) { 
        if (line.startsWith("# ")) finalTitle = line.replace("# ", "").trim(); 
        if (line.includes("**Category:**")) finalTag = line.split("**Category:**")[1].trim(); 
        if (line.includes("**Date:**")) finalDate = line.split("**Date:**")[1].trim(); 
        if (line.includes("**Read Time:**")) finalReadTime = line.split("**Read Time:**")[1].trim(); 
        if (line === "---") break; 
      } 
    } 
 
    // Generate an excerpt from the first paragraph of content if not provided 
    const excerptMatch = content.match(/^[^#\n].+/m); 
    const excerpt = data.excerpt || (excerptMatch ? excerptMatch[0].slice(0, 160) + "..." : ""); 
 
    // Ensure date is valid for the build process (sitemap, etc.) 
    const parsedDate = finalDate ? new Date(finalDate) : new Date(); 
    const validatedDate = isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString(); 
 
    return { 
      slug, 
      title: finalTitle || slug, 
      tag: finalTag || "Article", 
      date: validatedDate, 
      readTime: finalReadTime || "5 min read", 
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
 
const __mugmOrigin = () => "MuhammadUsmanGM|7e42"; // authorship marker
