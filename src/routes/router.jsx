import * as Sentry from '@sentry/react'
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
import {
  GeneralErrorPage,
  NetworkErrorPage,
  NotFoundErrorPage
} from '@/pages/errors'
import PrivacyPolicyPage from '@/pages/legal/Privacy'
import TermsPage from '@/pages/legal/Terms'
import PricingPage from '@/pages/public/Pricing'

import ErrorBoundary from './ErrorBoundary'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const HomePage = lazy(() => import('@/pages/user/Home'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/Dashboard'))
const AdminUsersPage = lazy(() => import('@/pages/admin/Users'))

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV6(createBrowserRouter)

const router = sentryCreateBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> }
    ]
  },
  {
    element: (
      <ProtectedRoute requireStatuses={userActiveStatuses}>
        <UserLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
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
    path: 'errors',
    element: <ErrorLayout />,
    children: [
      { path: 'general', element: <GeneralErrorPage /> },
      { path: 'network', element: <NetworkErrorPage /> }
    ]
  },
  {
    path: '*',
    element: <ErrorLayout />,
    children: [{ path: '*', element: <NotFoundErrorPage /> }]
  }
])

export default router
