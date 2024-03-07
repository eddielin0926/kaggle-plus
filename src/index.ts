import createChart from "./leaderboard";

const BASEURL = "https://www.kaggle.com";

document.addEventListener("readystatechange", async (event) => {
  if (document.readyState !== "complete") return;

  if (
    document.URL.match(
      /^https:\/\/www\.kaggle\.com\/competitions\/[^/]+\/leaderboard$/
    )
  ) {
    createChart();
  }
});

window.navigation.addEventListener("navigatesuccess", (navigateEvent) => {
  if (
    document.URL.match(
      /^https:\/\/www\.kaggle\.com\/competitions\/[^/]+\/leaderboard$/
    )
  ) {
    createChart();
  }
});
