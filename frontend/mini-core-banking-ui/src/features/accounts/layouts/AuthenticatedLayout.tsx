import { Layout, Avatar, Dropdown, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AuthenticatedLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sider collapsible>
        {/* Sidebar menu here *
      </Sider> */}

      <Layout>
        {/* <Header style={{ background: "#fff", textAlign: "right" }}>
          <Dropdown
            menu={{
              items: [
                {
                  key: "profile",
                  icon: <UserOutlined />,
                  label: "Profile",
                  onClick: () => navigate("/profile"),
                },
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "Logout",
                  onClick: logout,
                },
              ],
            }}
          >
            {/* <Avatar icon={<UserOutlined />} /> *
          </Dropdown>
        </Header> */}

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
