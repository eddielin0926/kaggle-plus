import packageJson from "./package.json";

const manifest: chrome.runtime.Manifest = {
  manifest_version: 3,
  name: "Kaggle Plus",
  version: packageJson.version,
  description: packageJson.description,
  icons: {
    "24": "icons/icon-24.png",
    "32": "icons/icon-32.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png",
  },
  content_scripts: [
    {
      run_at: "document_idle",
      matches: ["https://www.kaggle.com/*"],
      js: ["index.js"],
    },
  ],
};

export default manifest;
