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
  Callout,
} from "@tremor/react";
import { ExternalLink } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import truncateEthAddress from "truncate-eth-address";
import { GrantContributions } from "../../components/GrantContributions";
import { addressMetrics, rounds } from "../../data";

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
        <nav className="flex my-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {router?.query?.address
                    ? truncateEthAddress(router?.query?.address as string)
                    : ""}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <Callout
          title=""
          text="The data here is mostly not accurate, since the focus here is to showcase the dashboard UI for Sybil detection."
          color="yellow"
          height=""
          marginTop="mt-6"
        />
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
            <Card marginTop="mt-6">
              <GrantContributions
                roundName={"UNICEF Round"}
                isFirstIndex={false}
              />
            </Card>
            <Card marginTop="mt-6">
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
