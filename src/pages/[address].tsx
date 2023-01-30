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
  CategoryBar,
  DonutChart,
  List,
  ListItem,
  ProgressBar,
} from "@tremor/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { rounds, addressMetrics } from "../../data";
import { RoundTable } from "../../components/RoundTable";
import { Router, useRouter } from "next/router";

const cities = [
  {
    risk_score: "High",
    risk_count: 2,
  },
  {
    risk_score: "Medium",
    risk_count: 3,
  },
  {
    risk_score: "Low",
    risk_count: 1,
  },
];

const riskList = [
  {
    name: "Bulk Donation Risk",
    score: 45,
    level: "$ 27,955",
  },
  {
    name: "ATG Risk",
    score: 35,
    level: "$ 21,743",
  },
  {
    name: "Behavior Risk",
    score: 75,
    level: "$ 46,592",
  },
  {
    name: "Bulk Transfer Risk",
    score: 68,
    level: "$ 42,243",
  },
];

const AddressDetails: NextPage = () => {
  const [round, setRound] = React.useState(rounds[0].value);
  const router = useRouter();
  const isAllRounds = round === null;

  return (
    <div className="p-4">
      <Head>
        <title>Anti-Sybil Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Title>Lena Mayer</Title>
        <Text>{router.query.address}</Text>
        <ColGrid
          numColsMd={3}
          numColsLg={5}
          gapX="gap-x-6"
          gapY="gap-y-6"
          marginTop="mt-6"
        >
          {addressMetrics.map((item) => {
            return (
              <Card key={item.title}>
                <Flex alignItems="items-start">
                  <Text>{item.title}</Text>
                </Flex>
                <Flex
                  justifyContent="justify-start"
                  alignItems="items-baseline"
                  spaceX="space-x-3"
                  truncate={true}
                >
                  <Metric>{item.metric}</Metric>
                </Flex>
              </Card>
            );
          })}
          <Card>
            <Flex alignItems="items-start">
              <Text>Passport score</Text>
            </Flex>
            <CategoryBar
              categoryPercentageValues={[25, 25, 25, 25]}
              colors={["rose", "orange", "yellow", "emerald"]}
              percentageValue={62}
              showAnimation
              tooltip="62%"
            />
          </Card>
        </ColGrid>

        <ColGrid marginTop="mt-6" numColsMd={2} gapX="gap-x-6" gapY="gap-y-6">
          <Card>
            <RoundTable
              roundName={
                rounds.find(({ value }) => value === round)?.text || ""
              }
              isFirstIndex
            />
          </Card>
          <Card>
            <Title>Sybil Risk Scores</Title>

            <List marginTop="mt-4">
              {riskList.map((risk) => (
                <ListItem key={risk.name}>
                  <Block>
                    <Flex>
                      <Text>{risk.name}</Text>
                      <Text>{risk.score}</Text>
                    </Flex>
                    <CategoryBar
                      marginTop="mt-4"
                      categoryPercentageValues={[33, 34, 33]}
                      colors={["emerald", "amber", "rose"]}
                      percentageValue={risk.score}
                      showAnimation
                      tooltip={`${risk.score}`}
                      showLabels={false}
                    />
                  </Block>
                </ListItem>
              ))}
            </List>
          </Card>
        </ColGrid>
      </main>
    </div>
  );
};

function valueFormatter(number: number) {
  return `${number} risk`;
}

export default AddressDetails;
