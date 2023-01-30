import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color,
  Block,
  CategoryBar,
  DateRangePickerValue,
  DateRangePicker,
} from "@tremor/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import truncateEthAddress from "truncate-eth-address";

const colors: { [key: string]: Color } = {
  "Ready for dispatch": "gray",
  Cancelled: "rose",
  Shipped: "emerald",
};

const transactions = [
  {
    transactionID: "#123456",
    user: "Lena Mayer",
    address: "0x139710C37203ebd93fd663a6730a339E93e5DCf6",
    addressCreationDate: "24-12-2021",
    donationDate: "31-12-2021",
    amount: "49.90 DAI",
    transactionCount: 12,
  },
  {
    transactionID: "#123456",
    user: "Lena Mayer",
    address: "0x349710C37203ebd83fd663a6730a339E93e5DCt8",
    addressCreationDate: "24-12-2021",
    donationDate: "31-12-2021",
    amount: "49.90 DAI",
    transactionCount: 12,
  },
];

export function RoundTable({
  roundName,
  isFirstIndex,
}: {
  roundName: string;
  isFirstIndex: boolean;
}) {
  const router = useRouter();

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
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Donation Date</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.transactionID}>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>{item.donationDate}</TableCell>
              <TableCell textAlignment="text-right">{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
