import { Color } from "@tremor/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { randomDate } from "utils";

export const riskLevel = ["Low", "Medium", "High"];

export const scoreOptions = [
  {
    text: "All Score Levels",
    value: "",
  },
  {
    text: "High",
    value: "High",
  },
  {
    text: "Medium",
    value: "Medium",
  },
  {
    text: "Low",
    value: "Low",
  },
];

export const riskOptions = [
  {
    text: "All Risk Levels",
    value: "",
  },
  {
    text: "High",
    value: "High",
  },
  {
    text: "Medium",
    value: "Medium",
  },
  {
    text: "Low",
    value: "Low",
  },
];

export const statusOptions = [
  {
    text: "All Statuses",
    value: "",
  },
  {
    text: "Whitelist",
    value: "whitelist",
  },
  {
    text: "Suspicious",
    value: "Suspicious",
  },
  {
    text: "Flagged",
    value: "Flagged",
  },
];

export const rounds = [
  {
    text: "All Rounds",
    value: "all",
  },
  {
    text: "Fantom Round",
    value: "fantom",
  },
  {
    text: "Gitcoin GR15 Round",
    value: "gr15",
  },
];

export const addressMetrics = [
  {
    title: "Wallet Creation Date",
    metric: randomDate(new Date(2020, 0, 1), new Date()).format("MMM DD, YYYY"),
    extra: randomDate(new Date(2020, 0, 1), new Date()).fromNow(),
  },
  {
    title: "Number of transactions",
    metric: Math.floor(Math.random() * (300 + 1)) + 0,
  },
  // {
  //   title: "Total Balance",
  //   metric: Math.floor(Math.random() * (100 + 1)) + 0 + " USDT",
  // },
  {
    title: "Last activity date",
    metric: randomDate(new Date(2020, 0, 1), new Date()).format("MMM DD, YYYY"),
    extra: randomDate(new Date(2020, 0, 1), new Date()).fromNow(),
  },
];

type Category = {
  title: string;
  metric: string;
  metricPrev: string;
  percentage: string;
  color: Color;
};

export const categories: Record<string, Category[]> = {
  ["all"]: [
    {
      title: "Suspicous Users",
      metric: "1,633",
      metricPrev: "7,509",
      percentage: "27%",
      color: "orange",
    },
    {
      title: "Flagged Users",
      metric: "1251",
      metricPrev: "7,509",
      percentage: "21%",
      color: "rose",
    },
    {
      title: "Whitelisted Users",
      metric: "3,827",
      metricPrev: "7,509",
      percentage: "52%",
      color: "sky",
    },
  ],
  ["gr15"]: [
    {
      title: "Suspicous Users",
      metric: "1,156",
      metricPrev: "4,323",
      percentage: "26.7%",
      color: "orange",
    },
    {
      title: "Flagged Users",
      metric: "933",
      metricPrev: "4,323",
      percentage: "21.6%",
      color: "rose",
    },
    {
      title: "Whitelisted Users",
      metric: "2,234",
      metricPrev: "4,323",
      percentage: "51.7%",
      color: "sky",
    },
  ],
  ["fantom"]: [
    {
      title: "Suspicous Users",
      metric: "477",
      metricPrev: "3,186",
      percentage: "30%",
      color: "orange",
    },
    {
      title: "Flagged Users",
      metric: "318",
      metricPrev: "3,186",
      percentage: "20%",
      color: "rose",
    },
    {
      title: "Whitelisted Users",
      metric: "1593",
      metricPrev: "3,186",
      percentage: "50%",
      color: "sky",
    },
  ],
};
