import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship the workspace packages as TypeScript source and let Next transpile
  // them, so there is no separate build step for tokens or ui-web.
  transpilePackages: ["@kitecast/tokens", "@kitecast/ui-web"],
  eslint: {
    // Lint is run on its own (`npm run lint`), not gated inside the build.
    ignoreDuringBuilds: true,
  },
  // A stray lockfile outside this repo (in a parent directory) makes Next
  // misdetect the workspace root. Pin it to the actual monorepo root.
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
