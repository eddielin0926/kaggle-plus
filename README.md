# Kaggle Plus

Kaggle Plus is a browser extension that visualizes the leaderboard of a Kaggle competition.

![demo.gif](./docs/images/demo.gif)

## Installation

1. Download the latest release from the releases page or build the extension yourself
2. Open the Extensions page ([`chrome://extensions/`](chrome://extensions/), [`edge://extensions/`](edge://extensions/))
3. Enable Developer mode
4. Press the "Load unpacked" button and select the folder containing the extension
5. The extension should now be installed and visible in the Extensions page
6. Open a Kaggle competition and navigate to any competition's leaderboard to see the extension in action

## Development

### Setup

```sh
bun install
```

### Build

```sh
bun run build
```

## Roadmap

- [x] Display a bar chart of the leaderboard
- [ ] Release the extension on the Chrome Web Store
- [ ] Dark theme support
- [ ] Add a settings page to configure the extension
- [ ] Notebook translation support

## License

This project is licensed under the terms of the [MIT License](LICENSE)
