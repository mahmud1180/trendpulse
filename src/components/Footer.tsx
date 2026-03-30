import Link from "next/link";
import { CATEGORIES, SITE_NAME } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">{SITE_NAME}</h3>
            <p className="text-sm text-text-muted">
              Your daily dose of trending content across AI, tech, finance, and
              more. Stay informed, stay ahead.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-text-muted">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-text-muted">Terms of Use</span>
              </li>
              <li>
                <span className="text-sm text-text-muted">Disclaimer</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
