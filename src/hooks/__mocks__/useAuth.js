import { fn } from 'storybook/test'

export const useCurrentUser = fn(() => ({
  isPending: false,
  isFetching: false,
  isError: false,
  error: null,
  isSuccess: true,
  user: null,
  isAuthenticated: false
})).mockName('useCurrentUser')

export const useLogout = fn(() => ({
  mutate: fn(),
  isPending: false
})).mockName('useLogout')
