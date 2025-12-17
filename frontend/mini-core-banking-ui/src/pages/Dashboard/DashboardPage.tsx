import { Layout, Menu, Card, Row, Col, Statistic, Table, Typography, Button } from "antd";
import {
  DashboardOutlined,
  BankOutlined,
  SwapOutlined,
  UserOutlined,
  LogoutOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function DashboardP() {
  const navigate = useNavigate();

  const transactions = [
    {
      key: "1",
      date: "2025-12-10",
      type: "Deposit",
      amount: 5000,
      status: "Completed",
    },
    {
      key: "2",
      date: "2025-12-11",
      type: "Withdraw",
      amount: 2000,
      status: "Completed",
    },
    {
      key: "3",
      date: "2025-12-12",
      type: "Transfer",
      amount: 1500,
      status: "Pending",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="dark">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
            { key: "/accounts", icon: <BankOutlined />, label: "Accounts" },
            { key: "/transactions", icon: <SwapOutlined />, label: "Transactions" },
            { key: "/profile", icon: <UserOutlined />, label: "Profile" },
            { key: "/logout", icon: <LogoutOutlined />, label: "Logout" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px" }}>
          <Title level={4} style={{ margin: 0 }}>
            Mini Core Banking Dashboard
          </Title>
        </Header>

        <Content style={{ margin: "24px" }}>
          {/* SUMMARY CARDS */}
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Balance"
                  value={24500}
                  prefix={<DollarOutlined />}
                  suffix="ETB"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Accounts"
                  value={2}
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
                  suffix="ETB"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Withdrawals"
                  value={4000}
                  prefix={<ArrowUpOutlined />}
                  suffix="ETB"
                />
              </Card>
            </Col>
          </Row>

          {/* RECENT TRANSACTIONS */}
          <Card style={{ marginTop: 24 }} title="Recent Transactions">
            <Table
              dataSource={transactions}
              pagination={false}
              columns={[
                { title: "Date", dataIndex: "date" },
                { title: "Type", dataIndex: "type" },
                { title: "Amount", dataIndex: "amount" },
                { title: "Status", dataIndex: "status" },
              ]}
            />
          </Card>

          {/* ACTIONS */}
          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={8}>
              <Button type="primary" block onClick={() => navigate("/deposit")}>
                Deposit
              </Button>
            </Col>
            <Col span={8}>
              <Button type="default" block onClick={() => navigate("/withdraw")}>
                Withdraw
              </Button>
            </Col>
            <Col span={8}>
              <Button type="dashed" block onClick={() => navigate("/transfer")}>
                Transfer
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
