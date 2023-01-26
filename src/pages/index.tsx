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
} from "@tremor/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { rounds, categories } from "../../data";
import { DonationTable } from "../../components/DonationTable";

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
        <Title>Dashboard</Title>
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

        <Block marginTop="mt-6">
          <Card>
            {isAllRounds ? (
              rounds.slice(1).map(({ text }, index) => {
                const isFirstIndex = index === 0;
                return (
                  <DonationTable
                    roundName={text}
                    key={text}
                    isFirstIndex={isFirstIndex}
                  />
                );
              })
            ) : (
              <DonationTable
                roundName={
                  rounds.find(({ value }) => value === round)?.text || ""
                }
                key={round}
                isFirstIndex
              />
            )}
          </Card>
        </Block>
      </main>
    </div>
  );
};

export default Home;
