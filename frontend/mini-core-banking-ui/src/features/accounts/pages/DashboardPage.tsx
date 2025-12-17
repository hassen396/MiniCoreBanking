import React, { useState, type JSX } from 'react'
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Typography
} from 'antd'
import * as Icons from '@ant-design/icons'
import { Bar } from '@ant-design/charts'
import { useNavigate } from 'react-router-dom'

type IconProps = {
  icon: keyof typeof Icons | string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  const Comp = (Icons[icon as keyof typeof Icons] ??
    Icons.QuestionCircleOutlined) as React.FC<any>
  return <Comp {...props} />
}

const { Header, Content, Footer, Sider } = Layout

export default function DashboardPage (): JSX.Element {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  // Removed unused state

  const salesChartConfig = {
    data: [
      { quarter: 'Q1', value: 4000 },
      { quarter: 'Q2', value: 3000 },
      { quarter: 'Q3', value: 5000 },
      { quarter: 'Q4', value: 4500 }
    ],
    xField: 'value',
    yField: 'quarter',
    color: '#1677ff'
  }

  return (
    <Layout hasSider>
      {/* SIDEBAR */}
      <Sider
        collapsible
        theme='dark'
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Icon
            icon='AntDesignOutlined'
            style={{ fontSize: 48, color: '#fff' }}
          />
        </div>

        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/dashboard',
              icon: <Icons.DashboardOutlined />,
              label: 'Dashboard'
            },
            { key: '/profile', icon: <Icons.UserOutlined />, label: 'Profile' }
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
                icon={<Icon icon='MenuOutlined' />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Typography.Title level={4} style={{ margin: 0 }}>
                Dashboard
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
                  Account
                </Button>
              </Dropdown>
              <Badge count={4}>
                <Button type='text' icon={<Icon icon='BellOutlined' />} />
              </Badge>
            </Space>
          </Row>
        </Header>

        {/* CONTENT */}
        <Content style={{ padding: 24 }}>
          <Breadcrumb style={{ marginBottom: 24 }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>

          {/* STATS */}
          <Row gutter={[16, 16]}>
            {[
              {
                title: "Today's Sales",
                value: '$53,000',
                icon: 'DollarCircleTwoTone'
              },
              { title: "Today's Users", value: '3,200', icon: 'RocketTwoTone' },
              { title: 'New Clients', value: '1,200', icon: 'ContactsTwoTone' },
              { title: 'New Orders', value: '13,200', icon: 'ShoppingTwoTone' }
            ].map(item => (
              <Col xs={24} md={12} xl={6} key={item.title}>
                <Card>
                  <Row justify='space-between'>
                    <Col>
                      <Typography.Text type='secondary'>
                        {item.title}
                      </Typography.Text>
                      <Typography.Title level={3} style={{ margin: 0 }}>
                        {item.value}
                      </Typography.Title>
                    </Col>
                    <Icon icon={item.icon as any} style={{ fontSize: 48 }} />
                  </Row>
                </Card>
              </Col>
            ))}

            {/* BAR CHART */}
            <Col xs={24} xl={14}>
              <Card title='Quarterly Sales'>
                <Bar {...salesChartConfig} height={300} />
              </Card>
            </Col>

            {/* TABLE */}
            <Col xs={24} xl={10}>
              <Card title='Clients'>
                <Table
                  pagination={false}
                  dataSource={[
                    {
                      key: '1',
                      company: 'Acme',
                      status: <Tag color='success'>Completed</Tag>,
                      progress: <Progress percent={100} />
                    }
                  ]}
                  columns={[
                    { title: 'Company', dataIndex: 'company' },
                    { title: 'Status', dataIndex: 'status' },
                    { title: 'Progress', dataIndex: 'progress' }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Content>

        {/* FOOTER */}
        <Footer style={{ textAlign: 'center' }}>
          © MiniCoreBanking Dashboard
        </Footer>
      </Layout>
    </Layout>
  )
}
