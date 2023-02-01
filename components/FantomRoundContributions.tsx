import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Button,
  CategoryBar,
  Col,
  ColGrid,
  Color,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  SelectBox,
  SelectBoxItem,
  Text,
  TextInput,
  Title,
} from "@tremor/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { randomDate } from "utils";
import { z } from "zod";
import { riskLevel, riskOptions, scoreOptions, statusOptions } from "../data";
// import contributionData from "../data/GR15_contributions.json";
import isBetween from "dayjs/plugin/isBetween";
import grantData from "../data/Fantom_grants_applications.json";
import contributionData from "../data/Fantom_grants_votes.json";
import { Table } from "./Table";

dayjs.extend(isBetween);

const contributionSchema = z
  .object({
    address: z.string(),
    grant_name: z.string().optional(),
    amount_in_ftm: z.string(),
    created_at: z.string(),
    tx_count: z.number(),
    passport_score: z.number(),
    passport_level: z.string(),
    risk_level: z.string(),
    status: z.string(),
    wallet_created_on: z.string(),
  })
  .passthrough();

const statusList = ["Whitelist", "Flagged", "Suspicious"];

const risk_colors: Record<string, Color> = {
  Low: "emerald",
  Medium: "yellow",
  High: "rose",
};

const status_colors: Record<string, Color> = {
  Whitelist: "sky",
  Flagged: "rose",
  Suspicious: "orange",
};

type Contribution = z.infer<typeof contributionSchema>;

export function FantomContributions({
  roundName,
  isFirstIndex,
}: {
  roundName: string;
  isFirstIndex: boolean;
}) {
  const [contributionDate, setContributionDate] =
    useState<DateRangePickerValue>([new Date(2022, 1, 1), new Date()]);

  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [score, setScore] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  const onChangeDate = (value: DateRangePickerValue) => {
    setContributionDate(value);
  };

  const [copied, setCopied] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const copyToClipboard = (address: string) => () => {
    navigator.clipboard.writeText("0x139710C37203ebd93fd663a6730a339E93e5DCf6");
    setCopied(true);
    setSelectedAddress(address);

    setTimeout(() => {
      setCopied(false);
      setSelectedAddress("");
    }, 1000);
  };

  console.log("before process", contributionData);

  const handleViewMore = (address: string) => () => {
    router.push(`/${address}`);
  };

  const columns = React.useMemo<ColumnDef<Contribution>[]>(
    () => [
      // {
      //   header: "Contribution ID",
      //   accessorKey: "id",
      // },
      {
        header: "Wallet address",
        accessorKey: "address",
        cell: (props) => {
          const { getValue } = props;
          const address = getValue<string>();
          return (
            <Link
              href="/[address]"
              as={`/${address}`}
              className="cursor-pointer flex items-center"
            >
              <div className="mr-1 text-blue-500">{`${truncateEthAddress(
                address
              )}`}</div>
              {/* <ExternalLink size={12} color="#3b82f6" strokeWidth={2.5} /> */}
            </Link>
          );
        },
      },
      {
        header: "Wallet Creation Date",
        accessorKey: "wallet_created_on",
      },
      {
        header: "Contribution Date",
        accessorKey: "created_at",
      },
      {
        header: "Grant",
        accessorKey: "grant_name",
      },
      {
        header: "Amount",
        accessorKey: "amount_in_ftm",
        textAligment: "text-right",
      },
      {
        header: "Passport Score",
        accessorKey: "passport_score",
        cell: (props) => {
          const { getValue } = props;

          const score = getValue<number>();
          return (
            <CategoryBar
              categoryPercentageValues={[33.5, 33, 33.5]}
              colors={["rose", "yellow", "emerald"]}
              percentageValue={score}
              showLabels={false}
              showAnimation
              tooltip={`${score}%`}
            />
          );
        },
      },
      {
        header: "Risk Level",
        accessorKey: "risk_level",
        cell: (props) => {
          const { getValue } = props;

          const level = getValue<string>();
          return <Badge color={risk_colors[level]} text={level} size="xs" />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (props) => {
          const { getValue } = props;

          const status = getValue<string>();
          return (
            <Badge color={status_colors[status]} text={status} size="xs" />
          );
        },
      },
      {
        header: "Link",
        accessorKey: "address",
        cell: (props) => {
          const { getValue } = props;

          const address = getValue<string>();
          return (
            <Button
              size="xs"
              variant="secondary"
              text="View more"
              color="blue"
              onClick={handleViewMore(address)}
            />
          );
        },
      },
    ],
    []
  );

  // const keys = Object.keys as <T>(o: T) => Extract<keyof T, string | number>[];

  const data = React.useMemo<Contribution[]>(() => {
    return contributionData
      .map(
        ({
          created_at,
          source_wallet,
          destination_wallet,
          amount,
          token,
          // ...others
        }) => {
          const passport_score = Math.floor(Math.random() * (100 + 1)) + 0;

          // const grantName = keys(grantData)
          //   .map((key) => grantData[key])
          //   .find((i) => i.wallet_address === destination_wallet);

          const grantName = grantData.find(
            (i) => i.wallet_address === destination_wallet
          )!.title;

          console.log({ grantName });

          return {
            address: source_wallet,
            created_at: dayjs(created_at).format("MMM DD, YYYY"),
            tx_count: Math.floor(Math.random() * (300 + 1)) + 0,
            amount_in_ftm: amount + ` ${token}`,
            passport_score,
            passport_level:
              passport_score > 67
                ? "High"
                : passport_score > 33
                ? "Medium"
                : "Low",
            risk_level: riskLevel[Math.floor(Math.random() * riskLevel.length)],
            status: statusList[Math.floor(Math.random() * statusList.length)],
            wallet_created_on: randomDate(
              new Date(2020, 0, 1),
              new Date()
            ).format("MMM DD, YYYY"),
            // id: truncate(id, 15),
            grant_name: grantName,
            // ...others,
          };
        }
      )
      .filter((item) => {
        if (risk) {
          return item.risk_level === risk;
        }
        return true;
      })
      .filter((item) => {
        if (score) {
          return item.passport_level === score;
        }
        return true;
      })
      .filter((item) => {
        if (status) {
          return item.status === status;
        }
        return true;
      })
      .filter((item) => {
        if (contributionDate.length > 0) {
          return dayjs(item.created_at).isBetween(
            contributionDate[0],
            contributionDate[1],
            "day",
            "[)"
          );
        }
        return true;
      });
  }, [contributionData, risk, score, status, grantData, contributionDate]);

  console.log("after process", data);

  return (
    <>
      <Flex
        justifyContent="justify-start"
        spaceX="space-x-2"
        marginTop={isFirstIndex ? "mt-1" : "mt-8"}
      >
        <Title>{roundName} Donaters</Title>
        <Badge text="2312" color="blue" />
      </Flex>
      <Text marginTop="mt-2">
        List of grant donaters for{" "}
        {roundName === "All rounds" ? roundName.toLowerCase() : roundName}
      </Text>
      <Flex justifyContent="justify-end">
        <ColGrid numColsMd={10} numColsLg={12} gapX="gap-x-6" marginTop="mt-8">
          {/* <Col numColSpanLg={3} numColSpanMd={2}>
            <Text>Address:</Text>
            <TextInput
              marginTop="mt-2"
              id="walletAddress"
              name=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Search address"
              error={false}
              errorMessage=""
              disabled={false}
              maxWidth="max-w-none"
            />
          </Col> */}
          <Col numColSpanLg={2} numColSpanMd={2}>
            <Text>Risk Level:</Text>
            <SelectBox
              value={risk}
              onValueChange={(value) => setRisk(value)}
              placeholder="Choose a level"
              marginTop="mt-2"
            >
              {riskOptions.map((item) => (
                <SelectBoxItem
                  key={item.text}
                  text={item.text}
                  value={item.value}
                />
              ))}
            </SelectBox>
          </Col>
          <Col numColSpanLg={2} numColSpanMd={2}>
            <Text>Passport Score:</Text>
            <SelectBox
              value={score}
              onValueChange={(value) => setScore(value)}
              placeholder="Choose a score"
              marginTop="mt-2"
            >
              {scoreOptions.map((item) => (
                <SelectBoxItem
                  key={item.text}
                  text={item.text}
                  value={item.value}
                />
              ))}
            </SelectBox>
          </Col>
          <Col numColSpanLg={2} numColSpanMd={2}>
            <Text>Status:</Text>
            <SelectBox
              value={status}
              onValueChange={(value) => setStatus(value)}
              placeholder="Choose a status"
              marginTop="mt-2"
            >
              {statusOptions.map((item) => (
                <SelectBoxItem
                  key={item.text}
                  text={item.text}
                  value={item.value}
                />
              ))}
            </SelectBox>
          </Col>
          <Col numColSpanLg={3} numColSpanMd={2}>
            <Text>Contribution date:</Text>
            <DateRangePicker
              value={contributionDate}
              onValueChange={onChangeDate}
              options={undefined}
              enableDropdown={false}
              placeholder="Choose"
              enableYearPagination={false}
              minDate={null}
              maxDate={null}
              color="blue"
              maxWidth="max-w-none"
              marginTop="mt-2"
            />
          </Col>
        </ColGrid>
      </Flex>
      <Table data={data} columns={columns}></Table>
    </>
  );
}
