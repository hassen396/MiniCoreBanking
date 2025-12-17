import { Button, Space, Card } from "antd";

const QuickActions = () => {
  return (
    <Card title="Quick Actions">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button type="primary" block>Deposit</Button>
        <Button danger block>Withdraw</Button>
        <Button block>Transfer</Button>
      </Space>
    </Card>
  );
};

export default QuickActions;
