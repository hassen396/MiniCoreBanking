import { Card, Statistic } from "antd";

interface Props {
  balance: number;
}

const BalanceCard = ({ balance }: Props) => {
  return (
    <Card title="Account Balance">
      <Statistic
        value={balance}
        precision={2}
        prefix="$"
      />
    </Card>
  );
};

export default BalanceCard;
