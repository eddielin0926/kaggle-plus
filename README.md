# Kaggle Plus

Kaggle Plus is a browser extension that visualizes the leaderboard of a Kaggle competition.

![demo.gif](./docs/images/demo.gif)

## Installation

### Chrome Web Store

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/kaggle-plus/ikceihfcnjlaalaaglpadjkgdihdmbim)
2. Open a Kaggle competition and navigate to any competition's leaderboard to see the extension in action

### Manual Installation

3. Download the latest release from the releases page or build the extension yourself
4. Open the Extensions page ([`chrome://extensions/`](chrome://extensions/), [`edge://extensions/`](edge://extensions/))
5. Enable Developer mode
6. Press the "Load unpacked" button and select the folder containing the extension
7. The extension should now be installed and visible in the Extensions page
8. Open a Kaggle competition and navigate to any competition's leaderboard to see the extension in action

## Development

### Setup

```sh
bun install
```

### Build

```sh
bun run build
```

### Development

```sh
bun run dev
```

## Roadmap

- [x] Display a bar chart of the leaderboard
- [x] Release the extension on the Chrome Web Store
- [ ] Dark theme support
- [ ] Add a settings page to configure the extension
- [ ] Notebook translation support

## License

This project is licensed under the terms of the [MIT License](LICENSE)
