import { Button, Form, Input } from "antd";
import type { LoginRequest } from "../types";
import {login } from "../services/auth.api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values: LoginRequest) => {
    try {
      const response = await login(values.email, values.password);
      console.log("Login successful:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    }
    catch (error) {
      console.error("Login failed:", error);
    }
  };
    

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
