import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@kitecast/ui-web";
import { getSpot, getSpotSlugs } from "@/lib/spots-repository";
import { getWindLevel } from "@/lib/wind";
import { WindArrow } from "@/components/WindArrow";
import { WindFlow } from "@/components/WindFlow";
import { SpotHero } from "@/components/SpotHero";
import { ForecastChart } from "@/components/ForecastChart";
import { FavoriteButton } from "@/components/FavoriteButton";

export async function generateStaticParams() {
  const slugs = await getSpotSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spot = await getSpot(slug);
  if (!spot) notFound();

  const level = getWindLevel(spot.wind.speedKnots);

  return (
    <div>
      <div className="relative -mt-8 h-56 overflow-hidden rounded-b-lg sm:-mt-10 sm:h-72">
        <SpotHero slug={spot.slug} size="lg" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

        <Link
          href="/"
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-pill bg-card/90 px-3 py-1.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:bg-card sm:left-6 sm:top-6"
        >
          <BackIcon />
          All spots
        </Link>

        <FavoriteButton
          slug={spot.slug}
          name={spot.name}
          size="lg"
          className="absolute right-4 top-4 bg-card/90 backdrop-blur-sm sm:right-6 sm:top-6"
        />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-white/80">
            {spot.region}, {spot.country}
          </p>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{spot.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-0">
        {/* Current condition, expanded */}
        <div className="mt-6 rounded-lg border border-line bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-muted">
              Current condition
            </span>
            <Badge tone={level.tone}>{level.label}</Badge>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto]">
            <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
              <Stat label="Wind" value={`${spot.wind.speedKnots}kt`} />
              <Stat label="Gusts" value={`${spot.wind.gustKnots}kt`} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Direction
                </p>
                <p className="mt-1 flex items-center justify-center gap-1.5 font-display text-2xl font-semibold text-ink sm:justify-start">
                  <WindArrow cardinal={spot.wind.cardinal} className="text-ocean" />
                  {spot.wind.cardinal}
                </p>
              </div>
            </div>

            <WindFlow wind={spot.wind} size="lg" className="h-24 w-full sm:h-28 sm:w-56" />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-line bg-card p-5 sm:p-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted">
            Wind today, 6am to 6pm
          </span>
          <div className="mt-3">
            <ForecastChart spot={spot} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard label="Best months" value={spot.bestMonths} />
          <InfoCard label="Water" value={spot.waterType} />
          <InfoCard label="Level" value={spot.level} />
        </div>

        <div className="mt-8 pb-12">
          <h2 className="font-display text-lg font-semibold text-ink">About this spot</h2>
          <p className="mt-2 max-w-prose text-ink-soft">{spot.description}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-card px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 font-medium text-ink">{value}</p>
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
