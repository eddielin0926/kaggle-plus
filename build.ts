import manifest from "./manifest.json";

const SRCDIR = "src";
const OUTDIR = "dist";

// content_scripts
const scripts = manifest.content_scripts;
scripts.map(async (script) => {
  await Bun.build({
    entrypoints: script.js.map((path) => `${SRCDIR}/${path}`),
    outdir: `${OUTDIR}/scripts`,
  });
});

// icons
const icons = manifest.icons;
Object.entries(icons).map(async ([size, path]) => {
  const file = Bun.file(path);
  await Bun.write(`${OUTDIR}/${path}`, file);
});

// manifest.json
await Bun.write(`${OUTDIR}/manifest.json`, JSON.stringify(manifest));
