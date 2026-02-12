import { wrapCreateBrowserRouterV6 } from '@sentry/react'
import { createBrowserRouter } from 'react-router-dom'

import {
  AuthLayout,
  ErrorLayout,
  LegalLayout,
  PublicLayout,
  UserLayout
} from '@/layouts'
import { adminActiveStatuses, Role, userActiveStatuses } from '@/lib/types'
import {
  DashboardPage,
  SettingsPage as AdminSettingsPage,
  TeamPage,
  TeamsPage,
  UsersPage
} from '@/pages/admin'
import {
  AcceptInvitePage,
  EmailConfirmationPage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
  VerifyEmailPage
} from '@/pages/auth'
import {
  GeneralErrorPage,
  NetworkErrorPage,
  NotFoundErrorPage
} from '@/pages/errors'
import { PrivacyPage, TermsPage } from '@/pages/legal'
import { AdminsPage } from '@/pages/owner'
import { PricingPage } from '@/pages/public'
import { HomePage, SettingsPage as UserSettingsPage } from '@/pages/user'

import { ErrorBoundary } from './ErrorBoundary'
import { PrivateRoute, PublicRoute } from './guards'
import { RootRedirect } from './RootRedirect'

const sentryCreateBrowserRouter = wrapCreateBrowserRouterV6(createBrowserRouter)

export const router = sentryCreateBrowserRouter([
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
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'accept-invite', element: <AcceptInvitePage /> },
      { path: 'email-confirmation', element: <EmailConfirmationPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> }
    ]
  },
  {
    element: <LegalLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> }
    ]
  },
  {
    element: (
      <PrivateRoute
        requireStatuses={userActiveStatuses}
        requireRoles={[Role.USER]}
      >
        <UserLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'settings', element: <UserSettingsPage /> }
    ]
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute
        requireStatuses={adminActiveStatuses}
        requireRoles={[Role.ADMIN, Role.OWNER]}
      >
        <UserLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'teams', element: <TeamsPage /> },
      { path: 'teams/:id', element: <TeamPage /> },
      { path: 'settings', element: <AdminSettingsPage /> }
    ]
  },
  {
    path: '/owner',
    element: (
      <PrivateRoute
        requireStatuses={adminActiveStatuses}
        requireRoles={[Role.OWNER]}
      >
        <UserLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [{ path: 'admins', element: <AdminsPage /> }]
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
