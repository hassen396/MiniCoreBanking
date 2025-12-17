import { Form, Input, Button, Card } from "antd";

const ProfilePage = () => {
  return (
    <Card title="My Profile">
      <Form layout="vertical">
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>

        <Button type="primary">Update</Button>
      </Form>
    </Card>
  );
};

export default ProfilePage;
