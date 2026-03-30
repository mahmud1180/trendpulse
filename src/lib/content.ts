import fs from "fs";
import path from "path";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
  author: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: "ai-tools", name: "AI & Tools" },
  { slug: "finance", name: "Finance & Money" },
  { slug: "tech", name: "Tech & Gadgets" },
  { slug: "trending", name: "Trending Now" },
  { slug: "lifestyle", name: "Lifestyle & Hacks" },
  { slug: "stories", name: "Stories & Drama" },
];

export const SITE_URL = "https://trendpulse.blog";
export const SITE_NAME = "TrendPulse";
export const SITE_DESCRIPTION =
  "Your daily dose of trending content across AI, tech, finance, and more.";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getCategoryBadgeColor(category: string): string {
  const colors: Record<string, string> = {
    "ai-tools": "bg-badge-ai",
    finance: "bg-badge-finance",
    tech: "bg-badge-tech",
    trending: "bg-badge-trending",
    lifestyle: "bg-badge-lifestyle",
    stories: "bg-badge-stories",
  };
  return colors[category] || "bg-primary";
}

export { getCategoryBadgeColor };

function readArticlesFromDir(categorySlug: string): Article[] {
  const dirPath = path.join(CONTENT_DIR, categorySlug);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  const articles: Article[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const data = JSON.parse(raw) as Article;
      articles.push(data);
    } catch {
      // Skip malformed files
    }
  }

  return articles;
}

export function getAllArticles(): Article[] {
  const all: Article[] = [];
  for (const cat of CATEGORIES) {
    all.push(...readArticlesFromDir(cat.slug));
  }
  return all.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return readArticlesFromDir(category).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(
  category: string,
  slug: string
): Article | null {
  const articles = readArticlesFromDir(category);
  return articles.find((a) => a.slug === slug) || null;
}

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name || slug;
}
