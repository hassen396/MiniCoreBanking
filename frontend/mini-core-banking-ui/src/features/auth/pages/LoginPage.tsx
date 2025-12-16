import { Card } from "antd";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card title="MiniCoreBanking Login" style={{ width: 400 }}>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
