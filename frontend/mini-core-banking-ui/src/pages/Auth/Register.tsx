
import { Form, Input, Button, Card, Typography } from 'antd';
import { register } from '../../features/auth/services/auth.api';
import { useNavigate } from 'react-router-dom';
type UserTypes = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();
  const onFinish = async (values: UserTypes) => {
try {
    const response = await register(values.firstName, values.lastName, values.email, values.password);
    console.log("Registration successful:", response.data);
    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error);
  }
    // TODO: call your API here
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Create Account
        </Title>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
