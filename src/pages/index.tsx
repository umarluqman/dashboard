import {
  Block,
  Card,
  ColGrid,
  Metric,
  Text,
  Title,
  SelectBox,
  SelectBoxItem,
  Flex,
  Badge,
  Table,
  BarChart,
  DonutChart,
  Col,
} from "@tremor/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { rounds, categories } from "../../data";
import { DonationTable } from "../../components/DonationTable";
import { truncate } from "fs";

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

const cities = [
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

const valueFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

const Home: NextPage = () => {
  const [round, setRound] = React.useState(rounds[0].value);

  const isAllRounds = round === null;

  return (
    <div className="p-4">
      <Head>
        <title>Anti-Sybil Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Title>Anti-Sybil Dashboard</Title>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
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
        <ColGrid
          numColsMd={3}
          numColsLg={5}
          gapX="gap-x-6"
          gapY="gap-y-6"
          marginTop="mt-6"
        >
          {categories.map((item) => {
            const hasPreviousMetric = item.metricPrev !== undefined;
            const hasPercentage = item.percentage !== undefined;
            return (
              <Card key={item.title}>
                <Flex alignItems="items-start">
                  <Text>{item.title}</Text>
                  {hasPercentage && (
                    <Badge text={item.percentage || ""} color="sky" />
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
          <Col numColSpanMd={2}>
            <Card>
              <Title>Sybil Risks</Title>
              <Text>Type of Risk by Risk Level</Text>
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
          <Col numColSpanMd={1}>
            <Card hFull>
              <Title>Sybil Risk Score</Title>
              <Text>Addresses based on risk score level</Text>
              <Flex>
                <DonutChart
                  data={cities}
                  category="risk_count"
                  dataKey="risk_level"
                  valueFormatter={valueFormatter}
                  marginTop="mt-6"
                  colors={["rose", "yellow", "emerald"]}
                  label="1231 address"
                  height="h-52"
                />
              </Flex>
            </Card>
          </Col>
          <Col numColSpanMd={1}>
            <Card hFull>
              <Title>Passport Score</Title>
              <Text>Addresses based on Passport score level</Text>
              <Flex>
                <DonutChart
                  data={cities}
                  category="risk_count"
                  dataKey="risk_level"
                  valueFormatter={valueFormatter}
                  marginTop="mt-6"
                  colors={["yellow", "emerald", "rose"]}
                  label="1231 address"
                  height="h-52"
                />
              </Flex>
            </Card>
          </Col>
        </ColGrid>

        <Block marginTop="mt-6">
          {isAllRounds ? (
            rounds.slice(1).map(({ text }, index) => {
              const isFirstIndex = index === 0;
              return (
                <Card marginTop="mt-6">
                  <DonationTable
                    roundName={text}
                    key={text}
                    isFirstIndex={isFirstIndex}
                  />{" "}
                </Card>
              );
            })
          ) : (
            <Card marginTop="mt-6">
              <DonationTable
                roundName={
                  rounds.find(({ value }) => value === round)?.text || ""
                }
                key={round}
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
