import { Card, Col, Row, Statistic } from "antd";
import {
  DollarOutlined,
  BankOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

export default function BalanceCards({
  balance,
  accountsCount,
}: {
  balance: number;
  accountsCount: number;
}) {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic
            title="Total Balance"
            value={balance}
            prefix={<DollarOutlined />}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Accounts"
            value={accountsCount}
            prefix={<BankOutlined />}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Deposits"
            value={12000}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Withdrawals"
            value={4000}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
}
