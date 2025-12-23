import React, { useEffect, useState, type JSX } from 'react'
import {
  Badge,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
  message,
} from 'antd'
import * as Icons from '@ant-design/icons'
import Logo from '../../assets/Logo.png'
import { fetchMe } from '../../features/auth/services/auth.api'



import { useNavigate } from 'react-router-dom'
import DashboardContent from '../../components/DashboardContent'

type IconProps = {
  icon: keyof typeof Icons | string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  const Comp = (Icons[icon as keyof typeof Icons] ??
    Icons.QuestionCircleOutlined) as React.FC<any>
  return <Comp {...props} />
}

const { Header, Footer, Sider } = Layout

export default function AdminDashboard (): JSX.Element {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [admin, setUser] = useState<any>(null)
  

  useEffect(() => {
    const load = async () => {
      try {
        const [meRes] = await Promise.all([fetchMe()])
        setUser(meRes?.data ?? null)
      } catch (err) {
        message.error('Failed to load dashboard data')
        navigate('/login')
      }
    }
    load()
  }, [])

  return (
    <Layout hasSider>
      {/* SIDEBAR */}
      <Sider
        collapsible
        theme='light'
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div style={{ textAlign: 'center', padding: 20 }}>
          <img
            src={Logo}
            alt='Logo'
            style={{ width: 48, height: 48, objectFit: 'contain' }}
          />
        </div>

        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/dashboard',
              icon: <Icons.DashboardOutlined />,
              label: 'Dashboard'
            },
            { key: '/profile', icon: <Icons.UserOutlined />, label: 'Profile' },
            {
              key: '/create-account',
              icon: <Icons.TransactionOutlined />,
              label: 'Create Account'
            }
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        {/* HEADER */}
        <Header style={{ background: '#fff' }}>
          <Row justify='space-between' align='middle'>
            <Space>
              <Button
                type='text'
                icon={
                  collapsed ? (
                    <Icons.MenuUnfoldOutlined style={{ fontSize: '24px' }} />
                  ) : (
                    <Icons.MenuFoldOutlined style={{ fontSize: 24 }} />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
              />
              <Typography.Title level={4} style={{ margin: 0 }}>
                {admin
                  ? `Welcome, ${admin?.firstName ?? admin?.userName ?? 'User'}`
                  : 'Dashboard'}
              </Typography.Title>
            </Space>

            <Space>
              <Input
                placeholder='Search'
                prefix={<Icon icon='SearchOutlined' />}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Dropdown
                menu={{
                  items: [
                    { key: '/profile', label: 'Profile' },
                    { key: '/logout', label: 'Logout', danger: true }
                  ],
                  onClick: ({ key }) => navigate(key)
                }}
              >
                <Button type='text' icon={<Icon icon='UserOutlined' />}>
                  {admin
                    ? admin?.firstName ?? admin?.userName ?? 'Account'
                    : 'Account'}
                </Button>
              </Dropdown>
              <Badge count={4}>
                <Button type='text' icon={<Icon icon='BellOutlined' />} />
              </Badge>
            </Space>
          </Row>
        </Header>

        {/* CONTENT */}
        <DashboardContent />
        {/* FOOTER */}
        <Footer style={{ textAlign: 'center' }}>
          © MiniCoreBanking Dashboard
        </Footer>
      </Layout>
    </Layout>
  )
}
