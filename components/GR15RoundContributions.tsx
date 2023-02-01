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
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import truncate from "truncate";
import truncateEthAddress from "truncate-eth-address";
import { randomDate } from "utils";
import { z } from "zod";
import { riskLevel, riskOptions, scoreOptions, statusOptions } from "../data";
import contributionData from "../data/GR15_contributions.json";
// import contributionFantom from "../data/Fantom_grants_votes.json";
import isBetween from "dayjs/plugin/isBetween";
import grantData from "../data/GR15_grants_applications.json";
import { Table } from "./Table";

dayjs.extend(isBetween);

const contributionSchema = z.object({
  address: z.string(),
  short_address: z.string(),
  grant_id: z.string().optional(),
  grant_name: z.string().optional(),
  checkout_type: z.string(),
  amount_in_usdt: z.string(),
  raw_amount_in_token: z.string(),
  token: z.string(),
  amount_in_token_minus_gas: z.string(),
  tx_id: z.string().optional(),
  created_on: z.string(),
  modified_on: z.string(),
  tx_count: z.number(),
});

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

export function GR15Contributions({
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

  const handleViewMore = (address: string) => () => {
    router.push(`/${address}`);
  };

  const columns = React.useMemo<ColumnDef<Contribution>[]>(
    () => [
      {
        header: "Transaction ID",
        accessorKey: "tx_id",
      },
      {
        header: "Wallet address",
        accessorKey: "short_address",
        cell: (props) => {
          const { getValue } = props;

          const shortAddress = getValue<string>();
          return (
            <Link href="/[address]" as={`/${address}`}>
              <div className="mr-1 text-blue-500">{`${shortAddress}`}</div>
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
        accessorKey: "created_on",
      },
      {
        header: "Grant",
        accessorKey: "grant_name",
      },
      {
        header: "Amount (USDT)",
        accessorKey: "amount_in_usdt",
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

  const keys = Object.keys as <T>(o: T) => Extract<keyof T, string | number>[];

  const grants = keys(grantData).map((key) => grantData[key]);

  const data = React.useMemo<Contribution[]>(() => {
    return contributionData
      .map(
        ({
          created_on,
          address,
          tx_id,
          amount_in_usdt,
          modified_on,
          grant_id,
          ...others
        }) => {
          const passport_score = Math.floor(Math.random() * (100 + 1)) + 0;

          const grantName = grants.find(
            (grant) => grant.grant_id === Number(grant_id)
          )?.title;

          return {
            address,
            created_on: dayjs(created_on).format("MMM DD, YYYY"),
            modified_on: dayjs(modified_on).format("MMM DD, YYYY"),
            short_address: truncateEthAddress(address),
            tx_id: truncate(tx_id, 15),
            tx_count: Math.floor(Math.random() * (300 + 1)) + 0,
            amount_in_usdt: Number(amount_in_usdt).toFixed(3),
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
            grant_name: grantName,
            ...others,
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
          return dayjs(item.created_on).isBetween(
            contributionDate[0],
            contributionDate[1],
            "day",
            "[)"
          );
        }
        return true;
      });
  }, [contributionData, risk, score, status, grantData, contributionDate]);

  // console.log(data);

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
