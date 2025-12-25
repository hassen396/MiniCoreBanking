import React from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
} from 'antd'
import { transfer } from '../../api/transaction.api'



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}
type TransferType = {
  fromAccountNumber: string,
  toAccountNumber: string,
  amount: number,
  remarks?: string,
}

const Transfer: React.FC = () => {
  const [form] = Form.useForm()
  const variant = Form.useWatch('variant', form)
  const onFinish = async (values: TransferType) => {
var result;
    try {
       result = await transfer(values.fromAccountNumber, values.toAccountNumber, values.amount, values.remarks);
      message.success("Transfer successful!");
      form.resetFields();
    }
    catch (e: unknown) {
      const msg =
        e && typeof e === 'object' && 'message' in e
          ? String((e as any).message)
          : 'Unexpected error'
      const apiMsg = result?.data?.message ? String(result.data.message) : ''
      message.error(`Transfer failed: ${[apiMsg, msg].filter(Boolean).join(' ')}`)
    }
  }
      return (
    <div style={{marginTop: 100}}>
    <Form
      {...formItemLayout}
      form={form}
      variant={variant || 'outlined'}
      style={{ maxWidth: 600 }}
      initialValues={{ variant: 'outlined' }}
      onFinish={onFinish}
    >
      {/* <Form.Item label="Form variant" name="variant">
        <Segmented options={['outlined', 'filled', 'abcd']} />
      </Form.Item> */}

      <Form.Item
        label='From Account'
        name='fromAccountNumber'
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='To Account'
        name='toAccountNumber'
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label='Transfer Amount'
        name='amount'
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label='Remarks'
        name='remarks'
        rules={[{ required: false, message: 'Please input!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={null}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button type='text' htmlType='reset'>
            Reset
          </Button>
        </div>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Transfer
