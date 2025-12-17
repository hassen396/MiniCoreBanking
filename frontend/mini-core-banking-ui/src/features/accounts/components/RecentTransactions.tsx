import { Table, Card } from "antd";

const columns = [
  { title: "Date", dataIndex: "date" },
  { title: "Type", dataIndex: "type" },
  { title: "Amount", dataIndex: "amount" },
];

const data = [
  { key: 1, date: "2025-01-10", type: "Deposit", amount: 500 },
  { key: 2, date: "2025-01-09", type: "Withdraw", amount: -200 },
];

const RecentTransactions = () => {
  return (
    <Card title="Recent Transactions">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default RecentTransactions;
