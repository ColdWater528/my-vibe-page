import { readdir, writeFile, access } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const photosDir = join(__dirname, "..", "public", "photos");
const outputFile = join(__dirname, "..", "public", "data", "photos.json");

try {
  await access(photosDir);
  const files = await readdir(photosDir);
  const photos = files
    .filter((f) => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(f))
    .sort();
  await writeFile(outputFile, JSON.stringify(photos, null, 2));
  console.log(`Generated photos manifest with ${photos.length} photos.`);
} catch {
  // Photos directory doesn't exist or is empty
  await writeFile(outputFile, JSON.stringify([], null, 2));
  console.log("Generated empty photos manifest.");
}
