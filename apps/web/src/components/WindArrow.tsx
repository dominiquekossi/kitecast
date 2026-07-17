import { getWindArrowRotation } from "@/lib/wind";
import type { Cardinal } from "@/lib/types";

export function WindArrow({ cardinal, className }: { cardinal: Cardinal; className?: string }) {
  const rotation = getWindArrowRotation(cardinal);
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden
    >
      <path
        d="M12 3L12 21M12 3L6 9M12 3L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
