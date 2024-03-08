import match from "@remusao/url-match-patterns";
import createChart from "./leaderboard";

const BASEURL = "https://www.kaggle.com";

document.addEventListener("readystatechange", async (event) => {
  if (document.readyState !== "complete") return;

  if (match(`${BASEURL}/competitions/*/leaderboard`, document.URL)) {
    createChart();
  }
});

window.navigation.addEventListener("navigatesuccess", (navigateEvent) => {
  if (match(`${BASEURL}/competitions/*/leaderboard`, document.URL)) {
    createChart();
  }
});
