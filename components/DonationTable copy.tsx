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
  return (
    <>
      <Flex
        justifyContent="justify-start"
        spaceX="space-x-2"
        marginTop={isFirstIndex ? "mt-1" : "mt-8"}
      >
        <Title>{roundName} Donaters</Title>
        <Badge text="2312" color="gray" />
      </Flex>
      <Text marginTop="mt-2">
        List of grant donaters for{" "}
        {roundName === "All rounds" ? roundName.toLowerCase() : roundName}
      </Text>
      <Flex justifyContent="justify-end">
        <Block maxWidth="max-w-xs">
          <Text>Contribution date:</Text>
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
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Wallet Address</TableHeaderCell>
            <TableHeaderCell>Wallet Creation Date</TableHeaderCell>
            <TableHeaderCell>Transaction Count</TableHeaderCell>
            <TableHeaderCell>Contribution Date</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
            <TableHeaderCell>Passport Score</TableHeaderCell>
            <TableHeaderCell>Link</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.transactionID}>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>
                <div
                  onClick={copyToClipboard(item.address)}
                  style={{ position: "relative" }}
                >
                  {truncateEthAddress(item.address)}
                  {copied && selectedAddress === item.address && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-24px",
                        right: "56px",
                      }}
                    >
                      <Badge
                        text="Copied"
                        color="gray"
                        size="xs"
                        marginTop="mt-0"
                      />
                    </div>
                  )}{" "}
                </div>
              </TableCell>
              <TableCell>{item.addressCreationDate}</TableCell>
              <TableCell>{item.transactionCount}</TableCell>
              <TableCell>{item.donationDate}</TableCell>
              <TableCell textAlignment="text-right">{item.amount}</TableCell>
              <TableCell>
                <CategoryBar
                  categoryPercentageValues={[33.5, 33, 33.5]}
                  colors={["rose", "yellow", "emerald"]}
                  percentageValue={62}
                  showLabels={false}
                  showAnimation
                  tooltip="62%"
                />
              </TableCell>
              <TableCell>
                <Button
                  size="xs"
                  importance="secondary"
                  text="View more"
                  color="gray"
                  onClick={handleViewMore(item.address)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
