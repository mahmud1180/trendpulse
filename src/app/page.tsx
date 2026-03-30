import { getAllArticles, CATEGORIES, SITE_NAME } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import Link from "next/link";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Ahead of the{" "}
          <span className="text-primary">Trend</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Your daily briefing on AI, tech, finance, and everything trending.
          Curated content that keeps you informed.
        </p>
      </section>

      {/* Category pills */}
      <section className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="px-4 py-2 rounded-full border border-border text-sm font-medium text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            {cat.name}
          </Link>
        ))}
      </section>

      {/* Ad placeholder - top of page */}
      <AdPlaceholder slot="homepage-top" className="mb-8" />

      {/* Articles grid or empty state */}
      {articles.length === 0 ? (
        <section className="text-center py-20">
          <div className="text-6xl mb-4 opacity-30">&#9997;</div>
          <h2 className="text-2xl font-bold mb-2">No articles yet</h2>
          <p className="text-text-muted">
            Fresh content is on the way. Check back soon!
          </p>
        </section>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={`${article.category}-${article.slug}`} article={article} />
            ))}
          </section>

          {/* Mid-page ad */}
          {articles.length > 6 && (
            <AdPlaceholder slot="homepage-mid" className="mb-8" />
          )}

          {/* More articles */}
          {articles.length > 6 && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.slice(6).map((article) => (
                <ArticleCard key={`${article.category}-${article.slug}`} article={article} />
              ))}
            </section>
          )}
        </>
      )}

      {/* Bottom ad */}
      <AdPlaceholder slot="homepage-bottom" className="mt-8" />
    </div>
  );
}
