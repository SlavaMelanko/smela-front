import { createBrowserRouter } from 'react-router-dom'

import RootRedirect from './components/RootRedirect'
import { AuthLayout, PublicLayout } from './layouts'
import LoginPage from './pages/Login'
import PricingPlansPage from './pages/PricingPlans'
import RegisterPage from './pages/Register'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <RootRedirect /> },
      { path: 'pricing', element: <PricingPlansPage /> }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> }
    ]
  },
  {
    path: '*',
    element: <LoginPage />
  }
])

export default router
