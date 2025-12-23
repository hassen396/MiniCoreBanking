import { Button, Form, Input, Checkbox, Select, Typography, message } from "antd";
import type { LoginRequest } from "../types";
import { login } from "../services/auth.api";
import { useNavigate } from "react-router-dom";
import { GetRoleFromToken } from "../../../utils/jwt";

const providerOptions = [
  { label: "Default", value: "default" },
  { label: "Google", value: "google" },
  { label: "GitHub", value: "github" },
];

const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values: LoginRequest & { remember?: boolean; providerName?: string }) => {
    try {
      const response = await login(values.email, values.password);
      console.log("Login successful:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      const role = GetRoleFromToken();
      console.log('response data', response.data.accessToken)
      console.log(role, 'this is role')

      // Optional: honor "remember" by persisting provider choice
      // if (values.remember && values.providerName) {
      //   localStorage.setItem("providerName", values.providerName);
      // } else {
      //   localStorage.removeItem("providerName");
      // }
      if(role == 'Admin'){
        navigate("/admin/dashboard");
      } else if (role == 'User') {
        navigate('/user/dashboard');
        console.log('role is ', role)
      } else {
        navigate('/logout')
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials and try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        remember: true,
        providerName: localStorage.getItem("providerName") || "default",
      }}
      onFinish={onFinish}
    >
      <Typography.Title level={4}>Sign in</Typography.Title>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="you@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="••••••••" />
      </Form.Item>

      <Form.Item label="Provider (optional)" name="providerName">
        <Select allowClear options={providerOptions} placeholder="Select a provider" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;