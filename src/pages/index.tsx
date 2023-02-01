import {
  Badge,
  BarChart,
  Block,
  Callout,
  Card,
  Col,
  ColGrid,
  DonutChart,
  Flex,
  Legend,
  Metric,
  SelectBox,
  SelectBoxItem,
  Text,
  Title,
} from "@tremor/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { FantomContributions } from "../../components/FantomRoundContributions";
import { GR15Contributions } from "../../components/GR15RoundContributions";
import { categories, riskLevel, rounds } from "../../data";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const valueFormatter = (number: number) => number + " Addresses";

const Home: NextPage = () => {
  const [round, setRound] = React.useState(rounds[0].value);

  const isAllRounds = round === "all";

  const passportData = [
    {
      name: "Passport Score",
      Low: randomIntFromInterval(500, 3000),
      Medium: randomIntFromInterval(500, 3000),
      High: randomIntFromInterval(500, 3000),
    },
  ];

  const riskData = [
    {
      risk_type: "Bulk Donation Risk",
      High: randomIntFromInterval(500, 3000),
      Medium: randomIntFromInterval(500, 3000),
      Low: randomIntFromInterval(500, 3000),
    },
    {
      risk_type: "ATG Risk",
      High: randomIntFromInterval(500, 3000),
      Medium: randomIntFromInterval(500, 3000),
      Low: randomIntFromInterval(500, 3000),
    },
    {
      risk_type: "Behavior Risk",
      High: randomIntFromInterval(500, 3000),
      Medium: randomIntFromInterval(500, 3000),
      Low: randomIntFromInterval(500, 3000),
    },
    {
      risk_type: "Bulk Transfer Risk",
      High: randomIntFromInterval(500, 3000),
      Medium: randomIntFromInterval(500, 3000),
      Low: randomIntFromInterval(500, 3000),
    },
  ];

  const passport_score_level = [
    {
      risk_level: "High",
      risk_count: randomIntFromInterval(500, 3000),
    },
    {
      risk_level: "Medium",
      risk_count: randomIntFromInterval(500, 3000),
    },
    {
      risk_level: "Low",
      risk_count: randomIntFromInterval(500, 3000),
    },
  ];

  return (
    <div className="p-4">
      <Head>
        <title>Anti-Sybil Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-40">
        <Title>Anti-Sybil Dashboard</Title>
        <div className="flex justify-between items-baseline w-full">
          <nav className="flex my-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    Home
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <Block marginTop="mt-2" maxWidth="max-w-lg">
            <SelectBox
              value={round}
              onValueChange={setRound}
              placeholder="Choose a round"
            >
              {rounds.map((item) => (
                <SelectBoxItem
                  key={item.text}
                  text={item.text}
                  value={item.value}
                />
              ))}
            </SelectBox>
          </Block>
        </div>
        <Callout
          title=""
          text="The data here is mostly not accurate, since the focus here is to showcase the dashboard UI for Sybil detection."
          color="yellow"
          height=""
          marginTop="mt-6"
        />
        <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {categories[round].map((item) => {
            const hasPreviousMetric = item.metricPrev !== undefined;
            const hasPercentage = item.percentage !== undefined;

            const badgeColor = item.color;
            return (
              <Card key={item.title}>
                <Flex alignItems="items-start">
                  <Text>{item.title}</Text>
                  {hasPercentage && (
                    <Badge text={item.percentage || ""} color={badgeColor} />
                  )}
                </Flex>
                <Flex
                  justifyContent="justify-start"
                  alignItems="items-baseline"
                  spaceX="space-x-3"
                  truncate={true}
                >
                  <Metric>{item.metric}</Metric>
                  {hasPreviousMetric && (
                    <Text truncate={true}>from {item.metricPrev}</Text>
                  )}
                </Flex>
              </Card>
            );
          })}
        </ColGrid>
        <ColGrid numColsMd={4} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          <Col numColSpanMd={1}>
            <Card hFull>
              <Title>Passport Score</Title>
              <Text>Total addresses based on Passport score level</Text>
              <BarChart
                data={passportData}
                dataKey="name"
                categories={["Low", "Medium", "High"]}
                colors={["rose", "yellow", "green"]}
                marginTop="mt-6"
                yAxisWidth="w-12"
              />
            </Card>
          </Col>
          <Col numColSpanMd={1}>
            <Card hFull>
              <Title>Sybil Risk Score</Title>
              <Text>Total addresses based on risk score level</Text>
              <Legend
                categories={riskLevel}
                colors={["emerald", "yellow", "rose"]}
                marginTop="mt-6"
              />
              <Flex>
                <DonutChart
                  data={passport_score_level}
                  marginTop="mt-12"
                  category="risk_count"
                  dataKey="risk_level"
                  valueFormatter={valueFormatter}
                  colors={["rose", "yellow", "emerald"]}
                  label={`${randomIntFromInterval(500, 3000)} addresses`}
                  height="h-52"
                />
              </Flex>
            </Card>
          </Col>

          <Col numColSpanMd={2}>
            <Card>
              <Title>Sybil Risk Assessment</Title>
              <Text>Type of Risk by Risk Level acrosss all addresses</Text>
              <BarChart
                marginTop="mt-4"
                data={riskData}
                dataKey="risk_type"
                categories={["Low", "Medium", "High"]}
                colors={["emerald", "yellow", "rose"]}
                valueFormatter={valueFormatter}
                stack={true}
                relative={true}
                height="h-80"
              />
            </Card>
          </Col>
        </ColGrid>

        <Block marginTop="mt-6">
          {isAllRounds ? (
            rounds.slice(1).map(({ text, value }, index) => {
              const isFirstIndex = index === 0;
              return (
                <Card marginTop="mt-6" key={text}>
                  {value === "fantom" ? (
                    <FantomContributions
                      roundName={text}
                      isFirstIndex={isFirstIndex}
                    />
                  ) : (
                    <GR15Contributions
                      roundName={text}
                      isFirstIndex={isFirstIndex}
                    />
                  )}
                </Card>
              );
            })
          ) : (
            <Card marginTop="mt-6" key={round}>
              {round === "fantom" ? (
                <FantomContributions
                  roundName={
                    rounds.find(({ value }) => value === round)?.text || ""
                  }
                  isFirstIndex
                />
              ) : (
                <GR15Contributions
                  roundName={
                    rounds.find(({ value }) => value === round)?.text || ""
                  }
                  isFirstIndex
                />
              )}
            </Card>
          )}
        </Block>
      </main>
    </div>
  );
};

export default Home;
