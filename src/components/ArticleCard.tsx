import Link from "next/link";
import { Article, getCategoryBadgeColor, getCategoryName } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  const badgeColor = getCategoryBadgeColor(article.category);

  return (
    <article className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-surface">
      {/* Ad placeholder - top of card */}
      <div className="hidden" data-ad-slot="card-top" />

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`${badgeColor} text-white text-xs font-medium px-2.5 py-0.5 rounded-full`}
          >
            {getCategoryName(article.category)}
          </span>
          <span className="text-xs text-text-muted">{article.readingTime}</span>
        </div>

        <Link href={`/${article.category}/${article.slug}`}>
          <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>
        </Link>

        <p className="text-sm text-text-muted mb-3 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>{article.author}</span>
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
