import {
  Badge,
  Block,
  Button,
  Card,
  CategoryBar,
  Col,
  ColGrid,
  Flex,
  List,
  ListItem,
  Metric,
  ProgressBar,
  Text,
  Title,
} from "@tremor/react";
import { ExternalLink } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GrantContributions } from "../../components/GrantContributions";
import { addressMetrics, rounds } from "../../data";

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

const city = {
  name: "Off Running Inc.",
  industry: "tech",
  sales: 984888,
  delta: 61.3,
  deltaType: "increase",
  status: "emerald",
};

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

      <main className="mb-40">
        <Flex justifyContent="justify-start" spaceX="space-x-4">
          <Title>Lena Mayer</Title>
          <Badge text="Whitelist" color="sky" />
        </Flex>
        <Flex>
          <a
            className="cursor-pointer flex items-center"
            href={`https://etherscan.io/address/${router.query.address}`}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <div className="mr-1 text-blue-500">{`${router.query.address}`}</div>
            <ExternalLink size={12} color="#3b82f6" strokeWidth={2.5} />
          </a>
          <Flex justifyContent="justify-end" spaceX="space-x-4">
            <Button variant="secondary" color="blue">
              Mark as Suspicious
            </Button>
            <Button variant="secondary" color="blue">
              Mark as Flagged
            </Button>
            {/* <Button variant="secondary" color="blue">
              Mark as Whitelist
            </Button> */}
          </Flex>
        </Flex>
        <ColGrid numColsMd={4} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
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
                  marginTop="mt-3"
                >
                  <Metric>{item.metric}</Metric>
                  <Text>{item.extra}</Text>
                </Flex>
              </Card>
            );
          })}
          <Card>
            <Flex alignItems="items-start">
              <Text>Passport score</Text>
              <Badge text="62%" color="yellow" />
            </Flex>
            <CategoryBar
              marginTop="mt-3"
              categoryPercentageValues={[25, 25, 25, 25]}
              colors={["rose", "orange", "yellow", "emerald"]}
              percentageValue={62}
              showAnimation
              tooltip="62%"
            />
          </Card>
        </ColGrid>

        <ColGrid marginTop="mt-6" numColsMd={3} gapX="gap-x-6" gapY="gap-y-6">
          <Col numColSpanMd={1}>
            <Card>
              <Title>Sybil Risk Scores</Title>
              <List marginTop="mt-4">
                {riskList.map((risk) => (
                  <ListItem key={risk.name}>
                    <Block>
                      <Flex>
                        <Text>{risk.name}</Text>
                        <Text>{risk.score + " %"}</Text>
                      </Flex>
                      <ProgressBar
                        marginTop="mt-4"
                        color={"blue"}
                        percentageValue={risk.score}
                        showAnimation
                        tooltip={`${risk.score}`}
                      />
                    </Block>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Col>
          <Col numColSpanMd={2}>
            <Card>
              <GrantContributions roundName={"GR 15 Round"} isFirstIndex />
            </Card>
            <Card>
              <GrantContributions
                roundName={"UNICEF Round"}
                isFirstIndex={false}
              />
            </Card>
            <Card>
              <GrantContributions
                roundName={"Fantom Round"}
                isFirstIndex={false}
              />
            </Card>
          </Col>
        </ColGrid>
      </main>
    </div>
  );
};

export default AddressDetails;
