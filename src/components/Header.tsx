import Link from "next/link";
import { CATEGORIES, SITE_NAME } from "@/lib/content";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          {SITE_NAME}
        </Link>
        <nav className="hidden md:flex gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
        {/* Mobile menu toggle — keep it simple with a details/summary approach */}
        <details className="md:hidden relative">
          <summary className="cursor-pointer list-none text-text-muted hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full mt-2 bg-surface border border-border rounded-lg shadow-lg p-4 flex flex-col gap-3 min-w-48">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
