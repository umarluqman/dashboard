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
} from "@tremor/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { rounds, addressMetrics } from "../../data";
import { RoundTable } from "../../components/RoundTable";
import { Router, useRouter } from "next/router";

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
          <Card>
            <Flex alignItems="items-start">
              <Text>Passport score</Text>
            </Flex>
            <CategoryBar
              categoryPercentageValues={[25, 25, 25, 25]}
              colors={["rose", "yellow", "orange", "emerald"]}
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
        </ColGrid>
      </main>
    </div>
  );
};

export default AddressDetails;
