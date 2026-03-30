import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  getCategoryName,
  CATEGORIES,
  SITE_NAME,
} from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name = getCategoryName(category);
  if (!CATEGORIES.find((c) => c.slug === category)) return {};

  return {
    title: `${name} Articles`,
    description: `Browse all ${name} articles on ${SITE_NAME}. Stay informed with the latest trends and insights.`,
    openGraph: {
      title: `${name} Articles | ${SITE_NAME}`,
      description: `Browse all ${name} articles on ${SITE_NAME}.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!CATEGORIES.find((c) => c.slug === category)) {
    notFound();
  }

  const articles = getArticlesByCategory(category);
  const categoryName = getCategoryName(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-text-muted">
          {articles.length === 0
            ? "No articles in this category yet. Check back soon!"
            : `${articles.length} article${articles.length === 1 ? "" : "s"} in this category.`}
        </p>
      </section>

      <AdPlaceholder slot={`category-${category}-top`} className="mb-8" />

      {articles.length === 0 ? (
        <section className="text-center py-20">
          <div className="text-6xl mb-4 opacity-30">&#128240;</div>
          <h2 className="text-2xl font-bold mb-2">Coming soon</h2>
          <p className="text-text-muted">
            We&apos;re working on fresh {categoryName.toLowerCase()} content.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>
      )}

      <AdPlaceholder slot={`category-${category}-bottom`} className="mt-8" />
    </div>
  );
}
