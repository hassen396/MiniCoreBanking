import { useEffect, useState } from 'react'
import { Card, Descriptions, Spin, Alert } from 'antd'
import { fetchMe } from '../../auth/services/auth.api'

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const token = localStorage.getItem("accessToken");
        const response = await fetchMe()
        setUser(response.data)
      } catch (err) {
        setError('Failed to load profile information.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <Spin size='large' style={{ display: 'block', margin: '100px auto' }} />
    )
  }

  if (error) {
    return (
      <Alert
        type='error'
        message={error}
        showIcon
        style={{ maxWidth: 600, margin: '100px auto' }}
      />
    )
  }

  return (
    <Card title='My Profile' style={{ maxWidth: 600 }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label='First Name'>
          {user?.firstName ?? user?.userName ?? '-'}
        </Descriptions.Item>

        <Descriptions.Item label='Last Name'>
          {user?.lastName ?? '-'}
        </Descriptions.Item>

        <Descriptions.Item label='Email'>
          {user?.email ?? '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default ProfilePage
