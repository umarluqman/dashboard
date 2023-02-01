import {
  Badge,
  BarChart,
  Block,
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
import { RoundContributions } from "../../components/RoundContributions";
import { categories, riskLevel, rounds } from "../../data";

const chartdata = [
  {
    name: "Passport Score",
    Low: 2188,
    Medium: 743,
    High: 1445,
  },
];

const data = [
  {
    risk_type: "Bulk Donation Risk",
    High: 2890,
    Medium: 1400,
    Low: 4938,
  },
  {
    risk_type: "ATG Risk",
    High: 1890,
    Medium: 998,
    Low: 2938,
  },
  {
    risk_type: "Behavior Risk",
    High: 3890,
    Medium: 2980,
    Low: 2645,
  },
  {
    risk_type: "Bulk Transfer Risk",
    High: 3890,
    Medium: 2980,
    Low: 2645,
  },
];

const passport_score_level = [
  {
    risk_level: "High",
    risk_count: 16994,
  },
  {
    risk_level: "Medium",
    risk_count: 15728,
  },
  {
    risk_level: "Low",
    risk_count: 22581,
  },
];

const valueFormatter = (number: number) => number + " Addresses";

const Home: NextPage = () => {
  const [round, setRound] = React.useState(rounds[0].value);

  const isAllRounds = round === null;

  return (
    <div className="p-4">
      <Head>
        <title>Anti-Sybil Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-40">
        <Title>Anti-Sybil Dashboard</Title>
        <div className="flex justify-end w-full">
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
        <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {categories.map((item) => {
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

              {/* <DonutChart
                  marginTop="mt-12"
                  data={passport_score_level}
                  category="risk_count"
                  dataKey="risk_level"
                  valueFormatter={valueFormatter}
                  colors={["yellow", "emerald", "rose"]}
                  label="1231 address"
                  height="h-52"
                /> */}
              <BarChart
                data={chartdata}
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
                  label="1231 address"
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
                data={data}
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
            rounds.slice(1).map(({ text }, index) => {
              const isFirstIndex = index === 0;
              return (
                <Card marginTop="mt-6" key={text}>
                  <RoundContributions
                    roundName={text}
                    isFirstIndex={isFirstIndex}
                  />{" "}
                </Card>
              );
            })
          ) : (
            <Card marginTop="mt-6" key={round}>
              <RoundContributions
                roundName={
                  rounds.find(({ value }) => value === round)?.text || ""
                }
                isFirstIndex
              />
            </Card>
          )}
        </Block>
      </main>
    </div>
  );
};

export default Home;
