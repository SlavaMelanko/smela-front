import { Dialog, dialogContentVariants } from '@/components/ui/dialog'
import { Role, UserStatus } from '@/lib/types'

import { PricingSliderDialog, ProfileDialog } from '.'

// Wrapper with Dialog context for Base UI components
const DialogWrapper = ({ size, children }) => (
  <Dialog open>
    <div className={dialogContentVariants({ size })}>{children}</div>
  </Dialog>
)

const noop = () => {}

export default {
  title: 'Components/Dialogs',
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  },
  args: { size: 'md' }
}

export const UserProfile = {
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
    role: Role.ADMIN,
    status: UserStatus.ACTIVE
  },
  render: ({ size, role, status }) => (
    <DialogWrapper size={size}>
      <ProfileDialog
        profile={{
          id: 'usr_12345',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role,
          status
        }}
        onClose={noop}
      />
    </DialogWrapper>
  )
}

export const PricingSlider = {
  args: { size: 'lg' },
  render: ({ size }) => (
    <DialogWrapper size={size}>
      <PricingSliderDialog onComplete={noop} onClose={noop} />
    </DialogWrapper>
  )
}
