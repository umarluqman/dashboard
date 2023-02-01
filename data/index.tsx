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
    value: null,
  },
  {
    text: "UNICEF Round",
    value: "unicef",
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

export const categories: Category[] = [
  {
    title: "Suspicous Users",
    metric: "1,456",
    metricPrev: "4,134",
    percentage: "12%",
    color: "orange",
  },
  {
    title: "Flagged Users",
    metric: "933",
    metricPrev: "4,134",
    percentage: "34%",
    color: "rose",
  },
  {
    title: "Whitelisted Users",
    metric: "8%",
    metricPrev: "4,134",
    percentage: "80%",
    color: "sky",
  },
];
