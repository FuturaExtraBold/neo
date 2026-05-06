import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const QUALITY = 50;
const IMAGES_DIR = fileURLToPath(new URL("../src/assets/images", import.meta.url));

const files = (await readdir(IMAGES_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

await Promise.all(
  files.map(async (file) => {
    const src = join(IMAGES_DIR, file);
    const dest = join(IMAGES_DIR, `${basename(file, extname(file))}.webp`);
    await sharp(src).webp({ quality: QUALITY }).toFile(dest);
    console.log(`  ✓ ${file} → ${basename(dest)}`);
  }),
);

console.log(`Converted ${files.length} image(s) to WebP at ${QUALITY}% quality.`);
