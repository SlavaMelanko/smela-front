import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import RootRedirect from '@/components/RootRedirect'
import { AuthLayout, LegalLayout, PublicLayout, UserLayout } from '@/layouts'
import ErrorLayout from '@/layouts/Error'
import { adminActiveStatuses, userActiveStatuses } from '@/lib/types'
import EmailConfirmationPage from '@/pages/auth/EmailConfirmation'
import LoginPage from '@/pages/auth/Login'
import ResetPasswordPage from '@/pages/auth/ResetPassword'
import SignupPage from '@/pages/auth/Signup'
import VerifyEmailPage from '@/pages/auth/VerifyEmail'
import { NetworkErrorPage, NotFoundErrorPage } from '@/pages/errors'
import PrivacyPolicyPage from '@/pages/legal/Privacy'
import TermsPage from '@/pages/legal/Terms'
import PricingPage from '@/pages/public/Pricing'

import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const HomePage = lazy(() => import('@/pages/user/Home'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/Dashboard'))
const AdminUsersPage = lazy(() => import('@/pages/admin/Users'))

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <RootRedirect /> },
      { path: 'pricing', element: <PricingPage /> }
    ]
  },
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />
      },
      {
        path: 'email-confirmation',
        element: <EmailConfirmationPage />
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />
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
    path: 'errors',
    element: <ErrorLayout />,
    children: [{ path: 'network', element: <NetworkErrorPage /> }]
  },
  {
    element: (
      <ProtectedRoute requireStatuses={userActiveStatuses}>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'home',
        element: <HomePage />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requireStatuses={adminActiveStatuses}>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboardPage />
      },
      {
        path: 'users',
        element: <AdminUsersPage />
      }
    ]
  },
  {
    path: '*',
    element: (
      <ErrorLayout>
        <NotFoundErrorPage />
      </ErrorLayout>
    )
  }
])

export default router
