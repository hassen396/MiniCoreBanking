import { useEffect, useState } from 'react'
import {
  Card,
  Descriptions,
  Spin,
  Alert,
  Avatar,
  Typography,
  Space,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { fetchMe } from '../../auth/services/auth.api'

const { Title, Text } = Typography

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchMe()
        setUser(response.data)
      } catch {
        setError('Failed to load profile information.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 120 }}>
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <Text type="secondary">Loading your profile...</Text>
        </Space>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        type="error"
        message="Something went wrong"
        description={error}
        showIcon
        style={{ maxWidth: 500, margin: '120px auto' }}
      />
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7fa',
        paddingTop: 80,
      }}
    >
      <Card
        style={{
          maxWidth: 600,
          margin: '0 auto',
          borderRadius: 12,
        }}
        bodyStyle={{ padding: 32 }}
      >
        {/* Header */}
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1677ff' }}
          />

          <Title level={4} style={{ marginBottom: 0 }}>
            {user?.firstName || user?.userName}
          </Title>

          <Text type="secondary">{user?.email}</Text>
        </Space>

        {/* Details */}
        <Descriptions
          column={1}
          style={{ marginTop: 32 }}
          labelStyle={{ fontWeight: 500 }}
        >
          <Descriptions.Item label="First Name">
            {user?.firstName ?? '-'}
          </Descriptions.Item>

          <Descriptions.Item label="Last Name">
            {user?.lastName ?? '-'}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user?.email ?? '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default ProfilePage
