import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, "outputs");
await fs.mkdir(outDir, { recursive: true });

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
  args: ["--no-first-run", "--disable-background-networking"],
});
const page = await browser.newPage({
  viewport: { width: 1240, height: 1754 },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(path.join(__dirname, "posters.html")).href, {
  waitUntil: "networkidle",
});
await page.emulateMedia({ media: "print" });

await page.pdf({
  path: path.join(outDir, "sandvik-interview-sticky-note-posters.pdf"),
  format: "A4",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

const posters = await page.locator(".poster").all();
for (let i = 0; i < posters.length; i += 1) {
  await posters[i].screenshot({
    path: path.join(outDir, `poster-${String(i + 1).padStart(2, "0")}.png`),
    type: "png",
  });
}

await browser.close();

console.log(path.join(outDir, "sandvik-interview-sticky-note-posters.pdf"));
