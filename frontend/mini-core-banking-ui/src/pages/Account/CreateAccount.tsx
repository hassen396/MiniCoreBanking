
import { Button, Card, Form, Input, Select, message } from "antd";
import { createAccount } from "../../api/account.api";

const { Option } = Select;

type CreateAccountForm = {
  userName: string;
  type: number;
};

const CreateAccount = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: CreateAccountForm) => {
    try {
      await createAccount(values);
      message.success("Account created successfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to create account");
    }
  };

  return (
    <Card title="Create Bank Account" style={{ maxWidth: 500 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="User Email"
          name="userName"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="user@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Account Type"
          name="type"
          rules={[{ required: true, message: "Select account type" }]}
        >
          <Select placeholder="Select account type">
            <Option value={1}>Saving</Option>
            <Option value={2}>Current</Option>
            <Option value={3}>Fixed</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Account
        </Button>
      </Form>
    </Card>
  );
};

export default CreateAccount;
