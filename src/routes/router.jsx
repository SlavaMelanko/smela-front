import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import RootRedirect from '@/components/RootRedirect'
import { AuthLayout, LegalLayout, PublicLayout, UserLayout } from '@/layouts'
import { UserStatus } from '@/lib/types'
import { ActionHandler } from '@/pages/auth/ActionHandler'
import EmailConfirmationPage from '@/pages/auth/EmailConfirmation'
import LoginPage from '@/pages/auth/Login'
import ResetPasswordPage from '@/pages/auth/ResetPassword'
import SignupPage from '@/pages/auth/Signup'
import VerifyEmailPage from '@/pages/auth/VerifyEmail'
import PrivacyPolicyPage from '@/pages/legal/Privacy'
import TermsPage from '@/pages/legal/Terms'
import PricingPage from '@/pages/public/Pricing'

import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const HomePage = lazy(() => import('@/pages/user/Home'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/Dashboard'))

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <RootRedirect /> },
      { path: 'pricing', element: <PricingPage /> }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )
      },
      {
        path: 'signup',
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        )
      },
      {
        path: 'reset-password',
        element: (
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        )
      },
      {
        path: 'email-confirmation',
        element: <EmailConfirmationPage />
      },
      {
        path: 'verify-email',
        element: (
          <ProtectedRoute requireStatuses={[UserStatus.NEW]}>
            <VerifyEmailPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'auth/action',
        element: <ActionHandler />
      }
    ]
  },
  {
    element: <LegalLayout />,
    children: [
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> }
    ]
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: 'home',
        element: (
          <ProtectedRoute
            requireStatuses={[UserStatus.VERIFIED, UserStatus.ACTIVE]}
          >
            <HomePage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/admin',
    element: <UserLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute requireStatuses={[UserStatus.ACTIVE]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '*',
    element: <RootRedirect />
  }
])

export default router
