export default function AdPlaceholder({
  slot,
  className = "",
}: {
  slot: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface-alt border border-dashed border-border rounded-lg flex items-center justify-center text-text-muted text-xs min-h-24 ${className}`}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      {/* Google AdSense script will replace this */}
      <span className="opacity-40">Ad Space</span>
    </div>
  );
}
