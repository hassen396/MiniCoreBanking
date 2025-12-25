import { Button, Card, Form, Input, message } from "antd";
import { createUser } from "../../features/auth/services/auth.api";


type CreateUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const CreateUser = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: CreateUserForm) => {
    try {
      await createUser(values);
      message.success("User created successfully");
      form.resetFields();
    } catch {
      message.error("Failed to create user");
    }
  };

  return (
    <Card title="Create User" style={{ maxWidth: 500 }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 4 }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create User
        </Button>
      </Form>
    </Card>
  );
};

export default CreateUser;
