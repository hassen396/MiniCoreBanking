import React, { useEffect, useState } from 'react'
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
  Breadcrumb,
  message
} from 'antd'
import * as Icons from '@ant-design/icons'
import Logo from '../../assets/Logo.png'
import { fetchMe } from '../../features/auth/services/auth.api'

import { useNavigate } from 'react-router-dom'
import DashboardContent from '../../components/DashboardContent'
import ProfilePage from '../../features/accounts/pages/ProfilePage'
import Transfer from '../Account/Transfer'

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

export default function DashboardPage () {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState<any>(null)
  const [activeKey, setActiveKey] = useState<string>('/dashboard')
  const [depositOpen, setDepositOpen] = useState<boolean>(false)
  const [withdrawOpen, setWithdrawOpen] = useState<boolean>(false)

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
          selectedKeys={[activeKey]}
          onClick={({ key }) => {
            const k = String(key)
            if (k === '/deposit') {
              setActiveKey('/dashboard')
              setDepositOpen(true)
              return
            }
            if (k === '/withdraw') {
              setActiveKey('/dashboard')
              setWithdrawOpen(true)
              return
            }
            setActiveKey(k)
          }}
          items={[
            {
              key: '/dashboard',
              icon: <Icons.DashboardOutlined />,
              label: 'Dashboard'
            },
            { key: '/profile', icon: <Icons.UserOutlined />, label: 'Profile' },
            {
              key: '/transfer',
              icon: <Icons.TransactionOutlined />,
              label: 'Transfer'
            },
            {
              key: '/deposit',
              icon: <Icons.ArrowDownOutlined />,
              label: 'Deposit'
            },
            {
              key: '/withdraw',
              icon: <Icons.ArrowUpOutlined />,
              label: 'Withdraw'
            }
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        {/* HEADER */}
        <Header style={{ background: '#fff' }}>
          <Row justify='space-between' align='middle' wrap={false}>
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
              <div>
                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '40vw'
                  }}
                >
                  {user
                    ? `Welcome, ${user?.firstName ?? user?.userName ?? 'User'}`
                    : 'Dashboard'}
                </Typography.Title>
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {(
                      {
                        '/dashboard': 'Dashboard',
                        '/profile': 'Profile',
                        '/transfer': 'Transfer'
                      } as Record<string, string>
                    )[activeKey] ?? 'Dashboard'}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Space>

            <Space>
              <Input
                placeholder='Search'
                prefix={<Icon icon='SearchOutlined' />}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 260, maxWidth: '30vw' }}
              />
              <Dropdown
                menu={{
                  items: [
                    { key: '/profile', label: 'Profile' },
                    { key: '/logout', label: 'Logout', danger: true }
                  ],
                  onClick: ({ key }) => {
                    if (key === '/profile') setActiveKey('/profile')
                    else navigate(String(key))
                  }
                }}
              >
                <Button type='text' icon={<Icon icon='UserOutlined' />}>
                  {user
                    ? user?.firstName ?? user?.userName ?? 'Account'
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
        {activeKey === '/profile' ? (
          <ProfilePage />
        ) : activeKey === '/transfer' ? (
          <Transfer />
        ) : (
          <DashboardContent
            depositOpen={depositOpen}
            onChangeDepositOpen={setDepositOpen}
            withdrawOpen={withdrawOpen}
            onChangeWithdrawOpen={setWithdrawOpen}
          />
        )}
        {/* FOOTER */}
        <Footer style={{ textAlign: 'center' }}>© MiniCoreBanking</Footer>
      </Layout>
    </Layout>
  )
}
