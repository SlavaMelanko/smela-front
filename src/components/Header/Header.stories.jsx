import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import { Role, UserStatus } from '@/lib/types/user'

import { Header } from '.'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    role: {
      control: 'select',
      options: Object.values(Role)
    },
    status: {
      control: 'select',
      options: Object.values(UserStatus)
    }
  },
  args: {
    role: Role.USER,
    status: UserStatus.ACTIVE
  }
}

export const Default = {
  beforeEach: async context => {
    const { role, status } = context.args

    useCurrentUser.mockReturnValue({
      isPending: false,
      isError: false,
      isSuccess: true,
      user: {
        id: 'usr_12345',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role,
        status
      },
      isAuthenticated: true
    })

    useLogout.mockReturnValue({
      mutate: () => {},
      isPending: false
    })
  }
}

export const Loading = {
  beforeEach: async () => {
    useCurrentUser.mockReturnValue({
      isPending: true,
      isError: false,
      isSuccess: false,
      user: null,
      isAuthenticated: false
    })

    useLogout.mockReturnValue({
      mutate: () => {},
      isPending: false
    })
  }
}
