import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Auth/LoginPage'
import DashboardPage from '../pages/User/DashboardPage'
import ProfilePage from '../features/accounts/pages/ProfilePage'
import Register from '../pages/Auth/Register'
import Logout from '../pages/Auth/Logout'
import TellerDashboard from '../pages/Admin/AdminDashboard'
import CreateAccount from '../pages/Account/CreateAccount'

const AppRouter = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<Register />} />
    <Route path='/logout' element={<Logout />} />
    <Route path='/create-account' element={<CreateAccount />} />
    <Route path='/user/dashboard' element={<DashboardPage />} />
    <Route path='/' element={<DashboardPage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/teller/dashboard' element={<TellerDashboard />} />
    <Route path='/admin/dashboard' element={<TellerDashboard />} />
  </Routes>
)

export default AppRouter
