import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import SendEmail from '@/pages/SendEmail'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home'
import VerifyEmail from '@/pages/VerifyEmail'
import Orders from '@/pages/Orders'
import AccessSharing from '@/pages/AccessSharing'

function RouterProvider() {
  const { jwt } = useSelector((state) => state.auth)

  if (jwt) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scheduled-orders" element={<Orders />} />
        <Route path="/access-sharing" element={<AccessSharing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }

  // If the user is not logged in
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/send-email" element={<SendEmail />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RouterProvider
