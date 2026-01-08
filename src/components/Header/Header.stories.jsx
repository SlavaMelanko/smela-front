import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import { Role, UserStatus } from '@/lib/types/user'

import { Header } from '.'

const mockUser = {
  id: 'usr_12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  role: Role.USER,
  status: UserStatus.ACTIVE
}

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default = {
  async beforeEach() {
    useCurrentUser.mockReturnValue({
      isPending: false,
      isError: false,
      isSuccess: true,
      user: mockUser,
      isAuthenticated: true
    })

    useLogout.mockReturnValue({
      mutate: () => {},
      isPending: false
    })
  }
}

export const AdminUser = {
  async beforeEach() {
    useCurrentUser.mockReturnValue({
      isPending: false,
      isError: false,
      isSuccess: true,
      user: { ...mockUser, role: Role.ADMIN },
      isAuthenticated: true
    })

    useLogout.mockReturnValue({
      mutate: () => {},
      isPending: false
    })
  }
}

export const EnterpriseUser = {
  async beforeEach() {
    useCurrentUser.mockReturnValue({
      isPending: false,
      isError: false,
      isSuccess: true,
      user: { ...mockUser, role: Role.ENTERPRISE },
      isAuthenticated: true
    })

    useLogout.mockReturnValue({
      mutate: () => {},
      isPending: false
    })
  }
}
