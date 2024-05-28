# Kaggle Plus

![GitHub Release](https://img.shields.io/github/v/release/eddielin0926/kaggle-plus)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/eddielin0926/kaggle-plus/release.yml)
![GitHub License](https://img.shields.io/github/license/eddielin0926/kaggle-plus)![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/ikceihfcnjlaalaaglpadjkgdihdmbim)
![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/ikceihfcnjlaalaaglpadjkgdihdmbim)

Kaggle Plus is a browser extension that visualizes the leaderboard of a Kaggle competition.

![demo.gif](./docs/images/demo.gif)

## Installation

### Chrome Web Store

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/kaggle-plus/ikceihfcnjlaalaaglpadjkgdihdmbim)
2. Open a Kaggle competition and navigate to any competition's leaderboard to see the extension in action

### Manual Installation

1. Download the latest release from the releases page or build the extension yourself
2. Open the Extensions page ([`chrome://extensions/`](chrome://extensions/), [`edge://extensions/`](edge://extensions/))
3. Enable Developer mode
4. Press the "Load unpacked" button and select the folder containing the extension
5. The extension should now be installed and visible in the Extensions page
6. Open a Kaggle competition and navigate to any competition's leaderboard to see the extension in action

## Development

### Install

```sh
bun install
```

### Run

```sh
bun run dev
```

> You need to reload the extension on the Extensions page after making changes.

### Build

```sh
bun run build
```

## Roadmap

- [x] Display a bar chart of the leaderboard
- [x] Release the extension on the Chrome Web Store
- [ ] Dark theme support
- [ ] Add a settings page to configure the extension
- [ ] Notebook translation support

## License

This project is licensed under the terms of the [MIT License](LICENSE)
