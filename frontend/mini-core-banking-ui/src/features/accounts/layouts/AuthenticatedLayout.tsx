import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const AuthenticatedLayout = () => {
  // Layout wrapper for authenticated routes

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar could be added here if needed */}

      <Layout>
        {/* Header with account dropdown can be added here */}

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AuthenticatedLayout
