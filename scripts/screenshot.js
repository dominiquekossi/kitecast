// Standalone verification screenshots, independent of any editor's MCP
// browser tooling. Run with: node scripts/screenshot.js
// Requires the dev server already running at http://localhost:3000.
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const BASE_URL = process.env.KITECAST_URL || "http://localhost:3000";
const OUT_DIR = path.join(__dirname, "..", ".artifacts");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });

  // Next dev mode keeps an HMR websocket open, so "networkidle" never
  // resolves; wait for real content (an <article> card) instead.
  const ready = (page) => page.waitForSelector("article", { timeout: 60_000 });

  console.log("Loading spots list (desktop)...");
  await desktop.goto(BASE_URL + "/", { waitUntil: "load", timeout: 60_000 });
  await ready(desktop);
  await desktop.waitForTimeout(1500); // entrance stagger to finish
  await desktop.screenshot({ path: path.join(OUT_DIR, "01-list-desktop.png"), fullPage: true });

  console.log("Loading spots list (mobile)...");
  await mobile.goto(BASE_URL + "/", { waitUntil: "load", timeout: 60_000 });
  await ready(mobile);
  await mobile.waitForTimeout(1500);
  await mobile.screenshot({ path: path.join(OUT_DIR, "02-list-mobile.png"), fullPage: true });

  console.log("Loading spot detail (desktop)...");
  await desktop.goto(BASE_URL + "/spots/jericoacoara", { waitUntil: "load", timeout: 60_000 });
  await desktop.waitForSelector("h1");
  await desktop.waitForTimeout(600);
  await desktop.screenshot({ path: path.join(OUT_DIR, "03-detail-desktop.png"), fullPage: true });

  console.log("Loading spot detail (mobile)...");
  await mobile.goto(BASE_URL + "/spots/jericoacoara", { waitUntil: "load", timeout: 60_000 });
  await mobile.waitForSelector("h1");
  await mobile.waitForTimeout(600);
  await mobile.screenshot({ path: path.join(OUT_DIR, "03b-detail-mobile.png"), fullPage: true });

  console.log("Capturing card hover state...");
  await desktop.goto(BASE_URL + "/", { waitUntil: "load", timeout: 60_000 });
  await ready(desktop);
  await desktop.waitForTimeout(1500);
  const secondCard = desktop.locator("article").nth(1);
  await secondCard.hover();
  await desktop.waitForTimeout(500); // motion transition to settle
  await desktop.screenshot({ path: path.join(OUT_DIR, "04-card-hover.png") });

  await browser.close();
  console.log("Done. Screenshots in", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
