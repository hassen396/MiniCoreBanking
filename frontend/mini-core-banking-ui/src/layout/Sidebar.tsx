import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BankOutlined,
  SwapOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Sider collapsible theme="dark">
      <Menu
        theme="dark"
        mode="inline"
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "/accounts",
            icon: <BankOutlined />,
            label: "My Accounts",
          },
          {
            key: "/transactions",
            icon: <SwapOutlined />,
            label: "Transactions",
          },
          {
            key: "/profile",
            icon: <UserOutlined />,
            label: "Profile",
          },
          {
            key: "/logout",
            icon: <LogoutOutlined />,
            label: "Logout",
          },
        ]}
      />
    </Sider>
  );
}
