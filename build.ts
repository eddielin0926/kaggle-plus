import { Command } from "commander";
import { watch } from "fs";

import manifest from "./manifest";

type BuildConfig = {
  publicDir: string;
  sourceDir: string;
  outDir: string;
  manifest: chrome.runtime.Manifest;
  sourceMap?: "none" | "inline" | "external";
};

const build = async (config: BuildConfig) => {
  // content_scripts
  const scripts = config.manifest.content_scripts;
  if (!scripts) {
    console.error("No content scripts found in manifest");
    return;
  }
  scripts.map(async (script) => {
    if (!script.js) {
      console.error("No js files found in content script");
      return;
    }
    await Bun.build({
      entrypoints: script.js.map((path) => `${config.sourceDir}/${path}`),
      outdir: `${config.outDir}`,
      target: "browser",
      sourcemap: config.sourceMap,
    });
  });

  // icons
  const icons = config.manifest.icons;
  if (!icons) {
    console.error("No icons found in manifest");
    return;
  }
  Object.entries(icons).map(async ([size, path]) => {
    const file = Bun.file(`${config.publicDir}/${path}`);
    await Bun.write(`${config.outDir}/${path}`, file);
  });

  // manifest.json
  await Bun.write(
    `${config.outDir}/manifest.json`,
    JSON.stringify(config.manifest)
  );
};

const program = new Command();

program
  .option("--watch", "Watch for file changes", false)
  .option("--source <dir>", "Source directory", "src")
  .option("--out <dir>", "Output directory", "dist");

program.parse(process.argv);

const options = program.opts();

const buildConfig: BuildConfig = {
  publicDir: "public",
  sourceDir: options.source,
  outDir: options.out,
  manifest: manifest,
};

if (options.watch) {
  console.log("Watching for file changes");
  const watcher = watch("./src", { recursive: true }, (event, filename) => {
    console.log(`Detected ${event} in ${filename}`);
    build({ ...buildConfig, sourceMap: "inline" });
    console.log("Build complete");
  });
  process.on("SIGINT", () => {
    // close watcher when Ctrl-C is pressed
    console.log("Closing watcher...");
    watcher.close();
    process.exit(0);
  });
} else {
  console.log("Building...");
  build(buildConfig);
  console.log("Build complete");
}
