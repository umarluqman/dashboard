import {
  Badge,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { useRouter } from "next/router";
import grantContributions from "../data/GR15_grants_applications.json";

const transactions = [
  {
    transactionID: "#123456",
    grant: grantContributions[0].title,
    address: "0x139710C37203ebd93fd663a6730a339E93e5DCf6",
    addressCreationDate: "24-12-2021",
    donationDate: "31-12-2021",
    amount: "49.90 DAI",
    transactionCount: 12,
  },
  {
    transactionID: "#123456",
    grant: grantContributions[10].title,
    address: "0x349710C37203ebd83fd663a6730a339E93e5DCt8",
    addressCreationDate: "24-12-2021",
    donationDate: "31-12-2021",
    amount: "49.90 DAI",
    transactionCount: 12,
  },
];

export function GrantContributions({
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
        <Title>{roundName} Contributions</Title>
        <Badge text="2312" color="blue" />
      </Flex>
      <Text marginTop="mt-2">List of contributions for {roundName}</Text>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>Grant</TableHeaderCell>
            <TableHeaderCell>Contribution Date</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.transactionID}>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.grant}</TableCell>
              <TableCell>{item.donationDate}</TableCell>
              <TableCell textAlignment="text-right">{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
