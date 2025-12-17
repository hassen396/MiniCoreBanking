import { useEffect } from 'react';
import { Card, Button, Result } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// const { Title, Text } = Typography;

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // If you store anything else (cookies, etc.), clear it here
  }, []);

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
      <Card style={{ width: 500 }}>
        <Result
          icon={<LogoutOutlined />}
          title="You have been logged out"
          subTitle="Your session has ended securely."
          extra={[
            <Button
              type="primary"
              key="login"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </Button>,
            <Button
              key="home"
              onClick={() => navigate('/')}
            >
              Home
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default Logout;
