import { Bar } from '@ant-design/charts'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Layout,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography
} from 'antd';
import * as Icons from '@ant-design/icons';
import { useEffect, useMemo, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMe } from '../features/auth/services/auth.api';
import { getMyAccounts } from '../api/account.api';
import { deposit, transfer, withdraw } from '../api/transaction.api';

// type IconProps = {
//   icon: keyof typeof Icons | string
//   style?: React.CSSProperties
// }

// const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
//   const Comp = (Icons[icon as keyof typeof Icons] ??
//     Icons.QuestionCircleOutlined) as React.FC<any>
//   return <Comp {...props} />
// }

const { Content } = Layout
export default function DashboardContent (): JSX.Element {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const [isDepositOpen, setDepositOpen] = useState(false)
  const [isWithdrawOpen, setWithdrawOpen] = useState(false)
  const [isTransferOpen, setTransferOpen] = useState(false)
  const [accounts, setAccounts] = useState<Array<any>>([])
  
const [form] = Form.useForm()
  const [transferForm] = Form.useForm()
  
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [accRes] = await Promise.all([getMyAccounts()])

        setAccounts(accRes?.data ?? [])
      } catch (err) {
        message.error('Failed to load dashboard data')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalBalance = useMemo(
    () => accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0),
    [accounts]
  )
  const chartData = useMemo(
    () =>
      accounts.map(a => ({
        name: a.accountNumber ?? a.id,
        value: a.balance ?? 0
      })),
    [accounts]
  )

  const salesChartConfig = {
    data: chartData,
    xField: 'value',
    yField: 'name',
    color: '#1677ff'
  }

  const onDeposit = async () => {
    try {
      const values = await form.validateFields()
      await deposit(values.accountId, values.amount)
      message.success('Deposit successful')
      setDepositOpen(false)
    } catch (err) {
      // validation or API error
      if ((err as any)?.errorFields) return
      message.error('Deposit failed')
    }
  }

  const onWithdraw = async () => {
    try {
      const values = await form.validateFields()
      await withdraw(values.accountId, values.amount)
      message.success('Withdraw successful')
      setWithdrawOpen(false)
    } catch (err) {
      if ((err as any)?.errorFields) return
      message.error('Withdraw failed')
    }
  }

  const onTransfer = async () => {
    try {
      const values = await transferForm.validateFields()
      await transfer(values.fromAccountId, values.toAccountId, values.amount)
      message.success('Transfer successful')
      setTransferOpen(false)
    } catch (err) {
      if ((err as any)?.errorFields) return
      message.error('Transfer failed')
    }
  }
  return (
    <Content style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      {/* STATS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <Row justify='space-between'>
              <Col>
                <Typography.Text type='secondary'>
                  Total Balance
                </Typography.Text>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'USD'
                  }).format(totalBalance)}
                </Typography.Title>
              </Col>
              <Icons.DollarCircleTwoTone style={{ fontSize: 48 }} />
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <Row justify='space-between'>
              <Col>
                <Typography.Text type='secondary'>Accounts</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {accounts.length}
                </Typography.Title>
              </Col>
              <Icons.BankTwoTone style={{ fontSize: 48 }} />
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <Row justify='space-between'>
              <Col>

                <Button type='primary' onClick={() => setDepositOpen(true)}>
                  Deposit
                </Button>
              </Col>
              <Icons.ArrowDownOutlined style={{ fontSize: 32 }} />
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <Row justify='space-between'>
              <Col>

                <Button onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
              </Col>
              <Icons.ArrowUpOutlined style={{ fontSize: 32 }} />
            </Row>
          </Card>
        </Col>

        {/* BAR CHART */}
        <Col xs={24} xl={14}>
          <Card title='Balances by Account'>
            <Bar {...salesChartConfig} height={300} />
          </Card>
        </Col>

        {/* TABLE */}
        <Col xs={24} xl={10}>
          <Card title='My Accounts'>
            <Table
              loading={loading}
              pagination={false}
              rowKey={r => r.id}
              dataSource={accounts}
              columns={[
                { title: 'Account', dataIndex: 'accountNumber' },
                { title: 'Type', dataIndex: 'type' },
                {
                  title: 'Balance',
                  dataIndex: 'balance',
                  render: (v: number) =>
                    new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: 'USD'
                    }).format(v ?? 0)
                }
              ]}
            />
            <Space style={{ marginTop: 16 }}>
              <Button type='primary' onClick={() => setDepositOpen(true)}>
                Deposit
              </Button>
              <Button onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
              <Button type='dashed' onClick={() => setTransferOpen(true)}>
                Transfer
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Deposit / Withdraw Modal */}
      <Modal
        title='Deposit'
        open={isDepositOpen}
        onOk={onDeposit}
        onCancel={() => setDepositOpen(false)}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='accountId'
            label='Account'
            rules={[{ required: true }]}
          >
            <Select
              options={accounts.map((a: any) => ({
                value: a.id,
                label: a.accountNumber ?? a.id
              }))}
            />
          </Form.Item>
          <Form.Item
            name='amount'
            label='Amount'
            rules={[{ required: true, type: 'number', min: 0.01 }]}
          >
            <InputNumber style={{ width: '100%' }} step={0.01} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Withdraw'
        open={isWithdrawOpen}
        onOk={onWithdraw}
        onCancel={() => setWithdrawOpen(false)}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='accountId'
            label='Account'
            rules={[{ required: true }]}
          >
            <Select
              options={accounts.map((a: any) => ({
                value: a.id,
                label: a.accountNumber ?? a.id
              }))}
            />
          </Form.Item>
          <Form.Item
            name='amount'
            label='Amount'
            rules={[{ required: true, type: 'number', min: 0.01 }]}
          >
            <InputNumber style={{ width: '100%' }} step={0.01} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Transfer Modal */}
      <Modal
        title='Transfer'
        open={isTransferOpen}
        onOk={onTransfer}
        onCancel={() => setTransferOpen(false)}
      >
        <Form form={transferForm} layout='vertical'>
          <Form.Item
            name='fromAccountId'
            label='From'
            rules={[{ required: true }]}
          >
            <Select
              options={accounts.map((a: any) => ({
                value: a.id,
                label: a.accountNumber ?? a.id
              }))}
            />
          </Form.Item>
          <Form.Item name='toAccountId' label='To' rules={[{ required: true }]}>
            <Select
              options={accounts.map((a: any) => ({
                value: a.id,
                label: a.accountNumber ?? a.id
              }))}
            />
          </Form.Item>
          <Form.Item
            name='amount'
            label='Amount'
            rules={[{ required: true, type: 'number', min: 0.01 }]}
          >
            <InputNumber style={{ width: '100%' }} step={0.01} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}
