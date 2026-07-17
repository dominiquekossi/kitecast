import { getSpots } from "@/lib/spots-repository";
import { splitFeatured } from "@/lib/featured";
import { SpotsShowcase } from "@/components/SpotsShowcase";

export default async function SpotsListPage() {
  const spots = await getSpots();
  const { featured, rest } = splitFeatured(spots);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Spots</h1>
        <p className="mt-2 max-w-prose text-ink-soft">
          Current wind conditions across {spots.length} kitesurf destinations.
        </p>
      </div>

      <SpotsShowcase featured={featured} rest={rest} />
    </div>
  );
}
