import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <KiteMark />
          Kitecast
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-ink-soft transition-colors hover:bg-surface hover:text-ink"
          >
            Spots
          </Link>
          <Link
            href="/favorites"
            className="rounded-md px-3 py-2 text-ink-soft transition-colors hover:bg-surface hover:text-ink"
          >
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}

function KiteMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path d="M12 2L21 10L12 22L3 10Z" fill="#1B7A9E" />
      <path d="M12 2L21 10L12 13Z" fill="#0E5A78" />
      <path d="M12 22L12 13L3 10Z" fill="#F2624C" />
    </svg>
  );
}
