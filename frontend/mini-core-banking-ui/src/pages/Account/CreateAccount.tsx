import { Button, Card, Form, Input, Select, Typography, message } from "antd";
import { MailOutlined, BankOutlined } from "@ant-design/icons";
import { useState } from "react";
import { createAccount } from "../../api/account.api";

const { Option } = Select;
const { Title, Text } = Typography;

type CreateAccountForm = {
  userName: string;
  type: number;
};

const CreateAccount = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: CreateAccountForm) => {
    try {
      setLoading(true);
      await createAccount(values);
      message.success("Account created successfully");
      form.resetFields();
    } catch {
      message.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        paddingTop: 80,
      }}
    >
      <Card
        style={{
          maxWidth: 520,
          margin: "0 auto",
          borderRadius: 12,
        }}
        bodyStyle={{ padding: 32 }}
      >
        {/* Header */}
        <Title level={4} style={{ marginBottom: 4 }}>
          Create Bank Account
        </Title>
        <Text type="secondary">
          Open a new account for an existing user
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 32 }}
        >
          <Form.Item
            label="User Email"
            name="userName"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="user@gmail.com"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Account Type"
            name="type"
            rules={[{ required: true, message: "Select account type" }]}
          >
            <Select
              size="large"
              placeholder="Select account type"
              prefix={<BankOutlined />}
            >
              <Option value={1}>Saving</Option>
              <Option value={2}>Current</Option>
              <Option value={3}>Fixed</Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{ marginTop: 16 }}
          >
            Create Account
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateAccount;
