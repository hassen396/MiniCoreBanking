import { Button, Form, Input } from "antd";

const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log("Login values:", values);
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
