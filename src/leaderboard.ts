import axios from "axios";
import Highcharts from "highcharts";
import JSZip from "jszip";
import Papa from "papaparse";

type Record = {
  Rank: string;
  TeamId: string;
  TeamName: string;
  LastSubmissionDate: string;
  Score: string;
  SubmissionCount: string;
  TeamMemberUserNames: string;
};

const calcFrequency = (data: Record[]) => {
  const csvValues = data.map((d) => d.Score);

  // csvalues is string array of numbers. ex ["0.1", "0.2", "0.3", ...]
  // count the frequency of each score in bin of 0.0001
  const freq: any = {};
  csvValues.forEach((e) => {
    const key = Math.round((Number(e) + Number.EPSILON) * 10000) / 10000;
    freq[key] = (freq[key] || 0) + 1;
  });

  // convert the frequency object to 2d array
  const rst: number[][] = Object.entries(freq).map(([key, value]) => [
    Number(key),
    value as number,
  ]);

  return rst;
};

const calculateCumulative = (data: number[][]) => {
  let cumulativeCount = 0;
  const cumulative = [];
  for (const [score, count] of data) {
    cumulativeCount += count;
    cumulative.push([score, cumulativeCount]);
  }
  return cumulative;
};

const calculateRankPercentage = (total: number, data: number[][]) => {
  // Calculate rank percentage for each data point
  const rankPercentages = data.map(
    ([_, count]) => ((total - count) / total) * 100
  );

  return rankPercentages;
};

const createChart = async () => {
  // Find the download link element
  const downloadLinkElement = document.querySelector(
    'a[title="Download Leaderboard"]'
  );
  if (!downloadLinkElement) {
    console.error("Download link element not found");
    return;
  }

  // Get the download link
  const downloadLink = downloadLinkElement.getAttribute("href");
  if (!downloadLink) {
    console.error("Download link not found");
    return;
  }

  // Download the leaderboard data
  const zippedData = await axios
    .get(downloadLink, { responseType: "arraybuffer" })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Failed to download leaderboard data", err);
    });

  // Unzip the leaderboard data
  const unzippedData = await JSZip.loadAsync(zippedData).then((zip) => {
    const filename = Object.keys(zip.files)[0];
    return zip.file(filename)?.async("string");
  });
  if (!unzippedData) {
    console.error("Failed to unzip leaderboard data");
    return;
  }

  // Parse the leaderboard data
  const parsedData = Papa.parse(unzippedData, {
    header: true,
    skipEmptyLines: true,
  });

  // Calculate frequency of scores
  const scores = calcFrequency(parsedData.data as Record[]);

  const total = scores.reduce((acc, [_, count]) => acc + count, 0); // Calculate total count
  const sortedScores = scores.sort((a, b) => a[0] - b[0]); // Sort scores
  const cumulativeScores = calculateCumulative(sortedScores); // Calculate cumulative scores
  const rankPercentage = calculateRankPercentage(total, cumulativeScores); // Calculate rank percentage

  // Create a chart element
  // #site-content > div:nth-child(2) > div > div > div.sc-jkQkMl.cIBmrk > div.sc-eXWLHQ.lnjqIn
  // const anchorElement = document.querySelector("div.sc-fVZMuX.kdyPIO");
  const anchorElement = document.querySelector(
    "#site-content > div:nth-child(2) > div > div > div:nth-child(6) > div:nth-child(2)"
  );
  if (!anchorElement) {
    console.error("Anchor element not found");
    return;
  }
  const chartElement = document.createElement("div");
  chartElement.id = "container";
  anchorElement.appendChild(chartElement);

  // Create a chart
  const chartOptions: Highcharts.Options = {
    chart: {
      renderTo: "container",
      zooming: { type: "x" },
    },
    title: {
      text: undefined,
    },
    xAxis: {
      title: {
        text: "Score",
      },
    },
    yAxis: {
      title: {
        text: "Entries",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function (
        this: Highcharts.TooltipFormatterContextObject
      ): string {
        const index = this.point.index;
        const xValue = typeof this.x === "number" ? this.x.toFixed(4) : this.x;
        const rankValue = rankPercentage[index].toFixed(2);
        return `Top ${rankValue}%<br>Score: ${xValue}`;
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 20,
        groupPadding: 0,
        shadow: false,
      },
    },
    series: [
      {
        name: "score",
        type: "column",
        data: sortedScores,
      },
      {
        name: "rank",
        type: "spline",
        data: cumulativeScores,
        visible: false,
      },
    ],
  };

  const chart = Highcharts.chart(chartOptions);
};

export default createChart;
