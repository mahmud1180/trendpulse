import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllArticles,
  getCategoryName,
  getCategoryBadgeColor,
  CATEGORIES,
  SITE_URL,
  SITE_NAME,
} from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import AdPlaceholder from "@/components/AdPlaceholder";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) return {};

  const url = `${SITE_URL}/${category}/${slug}`;

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;

  if (!CATEGORIES.find((c) => c.slug === category)) {
    notFound();
  }

  const article = getArticleBySlug(category, slug);
  if (!article) {
    notFound();
  }

  const contentHtml = markdownToHtml(article.content);
  const badgeColor = getCategoryBadgeColor(article.category);
  const categoryName = getCategoryName(article.category);
  const url = `${SITE_URL}/${category}/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${category}`}
            className="hover:text-primary transition-colors"
          >
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-text truncate">{article.title}</span>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`${badgeColor} text-white text-xs font-medium px-2.5 py-0.5 rounded-full`}
            >
              {categoryName}
            </span>
            <span className="text-sm text-text-muted">
              {article.readingTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-text-muted mb-4">
            {article.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-text-muted border-b border-border pb-4">
            <span>By {article.author}</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Top ad */}
        <AdPlaceholder slot="article-top" className="mb-8" />

        {/* Article body */}
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Mid-article ad */}
        <AdPlaceholder slot="article-mid" className="my-8" />

        {/* CTA / Affiliate section */}
        <section className="bg-surface-alt border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold mb-2">Want to learn more?</h3>
          <p className="text-text-muted mb-4">
            Check out our recommended resources and tools related to this topic.
          </p>
          <div
            className="flex gap-3"
            data-affiliate-section="true"
            data-article-slug={article.slug}
          >
            {/* Affiliate links will be dynamically inserted here */}
            <span className="text-sm text-text-muted italic">
              Recommendations coming soon.
            </span>
          </div>
        </section>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-alt text-text-muted text-xs rounded-full border border-border"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom ad */}
        <AdPlaceholder slot="article-bottom" className="mt-8" />
      </article>
    </>
  );
}
