import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Auth/LoginPage'
import DashboardPage from '../features/accounts/pages/DashboardPage'
import ProfilePage from '../features/accounts/pages/ProfilePage'
import Register from '../pages/Auth/Register'
import Logout from '../pages/Auth/Logout'

const AppRouter = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<Register />} />
    <Route path='/logout' element={<Logout />} />

    <Route path='/dashboard' element={<DashboardPage />} />
    <Route path='/new-dashboard' element={<DashboardPage />} />
    <Route path='/profile' element={<ProfilePage />} />
  </Routes>
)

export default AppRouter
