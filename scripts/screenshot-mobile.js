// Verification screenshots for the Expo web export, independent of any
// editor's MCP browser tooling, same approach as scripts/screenshot.js but
// adapted for Expo Router's routes and React Native Web's DOM (no <article>
// tags, so readiness is detected by text content instead).
// Run with: node scripts/screenshot-mobile.js
// Requires `npx expo start --web` (or an exported build served) already
// running, default http://localhost:8081.
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const BASE_URL = process.env.KITECAST_MOBILE_URL || "http://localhost:8081";
const OUT_DIR = path.join(__dirname, "..", ".artifacts");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 414, height: 896 } });
  page.on("pageerror", (err) => console.error("PAGE ERROR:", err.message));

  console.log("Loading Spots screen...");
  await page.goto(BASE_URL + "/", { waitUntil: "load", timeout: 60_000 });
  await page.getByText("Spots").first().waitFor({ timeout: 60_000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, "mobile-01-spots.png") });

  console.log("Loading spot detail screen...");
  await page.goto(BASE_URL + "/spot/jericoacoara", { waitUntil: "load", timeout: 60_000 });
  await page.getByText("Jericoacoara").first().waitFor({ timeout: 60_000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, "mobile-02-detail.png") });

  console.log("Loading Favorites screen...");
  await page.goto(BASE_URL + "/favorites", { waitUntil: "load", timeout: 60_000 });
  await page.getByText("Favorites").first().waitFor({ timeout: 60_000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, "mobile-03-favorites.png") });

  await browser.close();
  console.log("Done. Screenshots in", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
