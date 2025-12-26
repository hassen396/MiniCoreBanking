import { Bar } from '@ant-design/charts'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Drawer,
  Row,
  Select,
  Space,
  Table,
  Typography
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllAccounts, getMyAccounts } from '../api/account.api'
import {
  deposit,
  transfer,
  withdraw,
  getTransactionsByAccount
} from '../api/transaction.api'
import { GetRoleFromToken } from '../utils/jwt'
import { GetUsersCount } from '../features/auth/services/auth.api'

const { Content } = Layout
const role = GetRoleFromToken()

type DashboardContentProps = {
  depositOpen?: boolean
  onChangeDepositOpen?: (open: boolean) => void
  withdrawOpen?: boolean
  onChangeWithdrawOpen?: (open: boolean) => void
}

export default function DashboardContent ({
  depositOpen,
  onChangeDepositOpen,
  withdrawOpen,
  onChangeWithdrawOpen
}: DashboardContentProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [accounts, setAccounts] = useState<any[]>([]) // user accounts
  const [adminAccounts, setAdminAccounts] = useState<any[]>([]) // paginated admin accounts

  const [usersCount, setUsersCount] = useState(0)
  const [accountCount, setAccountCount] = useState(0)

  // Admin pagination state
  const [adminPageNumber, setAdminPageNumber] = useState(1)
  const [adminPageSize, setAdminPageSize] = useState(5)

  // Admin transaction viewing state
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<
    string | null
  >(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [txTotal, setTxTotal] = useState(0)
  const [txPage, setTxPage] = useState(1)
  const [txPageSize, setTxPageSize] = useState(10)
  const [txLoading, setTxLoading] = useState(false)
  const [txDrawerOpen, setTxDrawerOpen] = useState(false)

  // Support both controlled (via props) and uncontrolled usage for modals
  const [internalDepositOpen, setInternalDepositOpen] = useState(false)
  const [internalWithdrawOpen, setInternalWithdrawOpen] = useState(false)
  const isDepositOpen = depositOpen ?? internalDepositOpen
  const isWithdrawOpen = withdrawOpen ?? internalWithdrawOpen
  const setDepositOpen = (open: boolean) => {
    if (onChangeDepositOpen) onChangeDepositOpen(open)
    else setInternalDepositOpen(open)
  }
  const setWithdrawOpen = (open: boolean) => {
    if (onChangeWithdrawOpen) onChangeWithdrawOpen(open)
    else setInternalWithdrawOpen(open)
  }
  const [isTransferOpen, setTransferOpen] = useState(false)

  const [form] = Form.useForm()
  const [transferForm] = Form.useForm()

  const reloadUserAccounts = async () => {
    try {
      const myAccountsRes = await getMyAccounts()
      setAccounts(myAccountsRes.data ?? [])
    } catch {
      // swallow; handled by outer load
    }
  }

  const reloadAdminAccounts = async () => {
    try {
      const accountsRes = await getAllAccounts(adminPageNumber, adminPageSize)
      setAdminAccounts(accountsRes.data.accounts ?? [])
      setAccountCount(accountsRes.data.totalCount ?? 0)
    } catch {
      // swallow; handled by outer load
    }
  }

  const loadTransactions = async (
    accountNumber: string,
    pageNumber = txPage,
    pageSize = txPageSize
  ) => {
    if (role !== 'Admin') return
    try {
      setTxLoading(true)
      const res = await getTransactionsByAccount(
        accountNumber,
        pageNumber,
        pageSize
      )
      setTransactions(res.data?.items ?? [])
      setTxTotal(res.data?.totalCount ?? 0)
    } catch {
      message.error('Failed to load transactions')
    } finally {
      setTxLoading(false)
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        if (role === 'Admin') {
          const [accountsRes, usersRes] = await Promise.all([
            getAllAccounts(adminPageNumber, adminPageSize),
            GetUsersCount()
          ])

          setAdminAccounts(accountsRes.data.accounts ?? [])
          setAccountCount(accountsRes.data.totalCount ?? 0)
          setUsersCount(usersRes.data ?? 0)
        } else {
          const myAccountsRes = await getMyAccounts()
          setAccounts(myAccountsRes.data ?? [])
        }
      } catch (err) {
        message.error('Failed to load dashboard data')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [adminPageNumber, adminPageSize])

  useEffect(() => {
    if (role !== 'Admin') return
    if (!selectedAccountNumber) return
    loadTransactions(selectedAccountNumber, txPage, txPageSize)
  }, [selectedAccountNumber, txPage, txPageSize])

  const totalBalance = useMemo(
    () => accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0),
    [accounts]
  )

  const chartData = useMemo(
    () =>
      accounts.map(a => ({
        name: a.accountNumber,
        value: a.balance ?? 0
      })),
    [accounts]
  )

  const chartConfig = {
    data: chartData,
    xField: 'name',
    yField: 'value'
  }

  const onDeposit = async () => {
    try {
      const { accountNumber, amount } = form.getFieldsValue()
      if (!accountNumber || !amount) {
        message.warning('Please provide account and amount')
        return
      }
      await deposit(accountNumber, amount)
      message.success('Deposit successful')
      setDepositOpen(false)
      form.resetFields()
      if (role === 'Admin') await reloadAdminAccounts()
      else await reloadUserAccounts()
    } catch (err) {
      message.error('Deposit failed')
    }
  }

  const onWithdraw = async () => {
    try {
      const { accountNumber, amount } = form.getFieldsValue()
      if (!accountNumber || !amount) {
        message.warning('Please provide account and amount')
        return
      }
      await withdraw(accountNumber, amount)
      message.success('Withdraw successful')
      setWithdrawOpen(false)
      form.resetFields()
      if (role === 'Admin') await reloadAdminAccounts()
      else await reloadUserAccounts()
    } catch (err) {
      message.error('Withdraw failed')
    }
  }

  const onTransfer = async () => {
    try {
      const { fromAccountNumber, toAccountNumber, amount } =
        transferForm.getFieldsValue()
      if (!fromAccountNumber || !toAccountNumber || !amount) {
        message.warning('Please fill all transfer fields')
        return
      }
      if (fromAccountNumber === toAccountNumber) {
        message.warning('From and To accounts must differ')
        return
      }
      await transfer(fromAccountNumber, toAccountNumber, amount)
      message.success('Transfer successful')
      setTransferOpen(false)
      transferForm.resetFields()
      await reloadUserAccounts()
    } catch (err) {
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
            <Typography.Text type='secondary'>
              {role === 'Admin' ? 'Total Users' : 'Total Balance'}
            </Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {role === 'Admin'
                ? usersCount
                : new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'ETB'
                  }).format(totalBalance)}
            </Typography.Title>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card>
            <Typography.Text type='secondary'>Total Accounts</Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {role === 'Admin' ? accountCount : accounts.length}
            </Typography.Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {role !== 'Admin' && (
          <Col xs={24} xl={14}>
            <Card title='Balances by Account'>
              <Bar {...chartConfig} height={300} />
            </Card>
          </Col>
        )}

        <Col xs={24} xl={role === 'Admin' ? 24 : 10}>
          <Card title={role === 'Admin' ? 'All Accounts' : 'My Accounts'}>
            <Table
              loading={loading}
              rowKey='id'
              pagination={
                role === 'Admin'
                  ? {
                      current: adminPageNumber,
                      pageSize: adminPageSize,
                      total: accountCount,
                      showSizeChanger: true
                    }
                  : false
              }
              dataSource={role === 'Admin' ? adminAccounts : accounts}
              columns={[
                { title: 'Account Number', dataIndex: 'accountNumber' },
                {
                  title: 'Type',
                  dataIndex: 'type',
                  render: (t: number | string) => {
                    const map: Record<number, string> = {
                      1: 'Saving',
                      2: 'Current',
                      3: 'Fixed'
                    }
                    const n = Number(t)
                    return map[n] ?? String(t)
                  }
                },
                {
                  title: 'Balance',
                  dataIndex: 'balance',
                  render: (v: number) =>
                    new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: 'ETB'
                    }).format(v ?? 0)
                }
              ]}
              onChange={(pagination: any) => {
                if (role !== 'Admin') return
                const { current, pageSize } = pagination || {}
                if (typeof current === 'number') setAdminPageNumber(current)
                if (typeof pageSize === 'number') setAdminPageSize(pageSize)
              }}
              onRow={(record: any) =>
                role === 'Admin'
                  ? {
                      onClick: () => {
                        const accountNumber = record?.accountNumber
                        if (!accountNumber) return
                        setSelectedAccountNumber(accountNumber)
                        setTxPage(1)
                        setTxDrawerOpen(true)
                        loadTransactions(accountNumber, 1, txPageSize)
                      }
                    }
                  : {}
              }
            />

            {role !== 'Admin' && (
              <Space style={{ marginTop: 16 }}>
                <Button type='primary' onClick={() => setDepositOpen(true)}>
                  Deposit
                </Button>
                <Button onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
                <Button type='dashed' onClick={() => setTransferOpen(true)}>
                  Transfer to own
                </Button>
              </Space>
            )}
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
            name='accountNumber'
            label='Account'
            rules={[{ required: true }]}
          >
            <Input placeholder='Enter account number' />
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
            name='accountNumber'
            label='Account Number'
            rules={[{ required: true }]}
          >
            {role === 'Admin' ? (
              <Input placeholder='Enter account number' />
            ) : (
              <Select
                options={accounts.map((a: any) => ({
                  value: a.accountNumber,
                  label: a.accountNumber
                }))}
              />
            )}
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
            name='fromAccountNumber'
            label='From'
            rules={[{ required: true }]}
          >
            <Select
              options={accounts.map((a: any) => ({
                value: a.accountNumber,
                label: a.accountNumber
              }))}
            />
          </Form.Item>
          <Form.Item
            name='toAccountNumber'
            label='To'
            rules={[{ required: true }]}
          >
            <Select
              options={accounts.map((a: any) => ({
                value: a.accountNumber,
                label: a.accountNumber
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

      <Drawer
        title={`Transactions${
          selectedAccountNumber ? ` - ${selectedAccountNumber}` : ''
        }`}
        placement='right'
        width={520}
        onClose={() => setTxDrawerOpen(false)}
        open={txDrawerOpen}
        destroyOnClose
      >
        <Table
          rowKey='id'
          loading={txLoading}
          dataSource={transactions}
          pagination={{
            current: txPage,
            pageSize: txPageSize,
            total: txTotal,
            showSizeChanger: true
          }}
          onChange={(pagination: any) => {
            const { current, pageSize } = pagination || {}
            if (typeof current === 'number') setTxPage(current)
            if (typeof pageSize === 'number') setTxPageSize(pageSize)
          }}
          columns={[
            {
              title: 'Date',
              dataIndex: 'timestamp',
              render: (v: string) => new Date(v).toLocaleString()
            },
            {
              title: 'Type',
              dataIndex: 'type'
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              render: (v: number) =>
                new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'ETB'
                }).format(v ?? 0)
            },
            {
              title: 'Remarks',
              dataIndex: 'remarks'
            }
          ]}
        />
      </Drawer>

      {/* MODALS (unchanged logic) */}
      {/* <Modal title='Deposit' open={isDepositOpen} onOk={() => {}} onCancel={() => setDepositOpen(false)} />
      <Modal title='Withdraw' open={isWithdrawOpen} onOk={() => {}} onCancel={() => setWithdrawOpen(false)} />
      <Modal title='Transfer' open={isTransferOpen} onOk={() => {}} onCancel={() => setTransferOpen(false)} /> */}
    </Content>
  )
}
