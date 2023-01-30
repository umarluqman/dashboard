import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Block,
  Button,
  CategoryBar,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Text,
  Title,
} from "@tremor/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import truncate from "truncate";
import truncateEthAddress from "truncate-eth-address";
import { z } from "zod";
import grantsRound15 from "../data/GR15_contributions.json";
import { Table } from "./Table";

const contributionSchema = z.object({
  address: z.string(),
  short_address: z.string(),
  grant_id: z.string(),
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

const riskLevel = ["Low", "Medium", "High"];
const colors = { Low: "emerald", Medium: "yellow", High: "rose" };

type Contribution = z.infer<typeof contributionSchema>;

export function DonationTable({
  roundName,
  isFirstIndex,
}: {
  roundName: string;
  isFirstIndex: boolean;
}) {
  const [donationDate, setDonationDate] = useState<DateRangePickerValue>([
    new Date(2022, 1, 1),
    new Date(),
  ]);

  const router = useRouter();

  const onChangeDate = (value: DateRangePickerValue) => {
    setDonationDate(value);
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
      },
      {
        header: "Wallet Creation Date",
        accessorKey: "wallet_created_on",
      },
      {
        header: "Transaction Count",
        accessorKey: "tx_count",
      },
      {
        header: "Donation Date",
        accessorKey: "created_on",
      },
      {
        header: "Amount (USDT)",
        accessorKey: "amount_in_usdt",
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
          return <Badge color={colors[level]} text={level} size="xs" />;
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
              color="fuchsia"
              onClick={handleViewMore(address)}
            />
          );
        },
      },
    ],
    []
  );

  const data = React.useMemo<Contribution[]>(() => {
    return grantsRound15.map(
      ({
        created_on,
        address,
        tx_id,
        amount_in_usdt,
        modified_on,
        ...others
      }) => {
        return {
          address,
          created_on: dayjs(created_on).format("DD/MM/YYYY"),
          modified_on: dayjs(modified_on).format("DD/MM/YYYY"),
          short_address: truncateEthAddress(address),
          tx_id: truncate(tx_id, 15),
          tx_count: Math.floor(Math.random() * (300 + 1)) + 0,
          amount_in_usdt: Number(amount_in_usdt).toFixed(3),
          passport_score: Math.floor(Math.random() * (100 + 1)) + 0,
          risk_level: riskLevel[Math.floor(Math.random() * riskLevel.length)],
          ...others,
        };
      }
    );
  }, [grantsRound15]);

  return (
    <>
      <Flex
        justifyContent="justify-start"
        spaceX="space-x-2"
        marginTop={isFirstIndex ? "mt-1" : "mt-8"}
      >
        <Title>{roundName} Donaters</Title>
        <Badge text="2312" color="fuchsia" />
      </Flex>
      <Text marginTop="mt-2">
        List of grant donaters for{" "}
        {roundName === "All rounds" ? roundName.toLowerCase() : roundName}
      </Text>
      <Flex justifyContent="justify-end">
        <Block maxWidth="max-w-xs">
          <Text>Donation date:</Text>
          <DateRangePicker
            value={donationDate}
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
        </Block>
      </Flex>
      <Table data={data} columns={columns}></Table>
    </>
  );
}
