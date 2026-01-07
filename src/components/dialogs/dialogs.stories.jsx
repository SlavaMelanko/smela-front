import { Dialog, dialogContentVariants } from '@/components/ui/dialog'

import { PricingSliderDialog, ProfileDialog } from '.'

const mockProfile = {
  id: 'usr_12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  status: 'active'
}

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
  render: ({ size }) => (
    <DialogWrapper size={size}>
      <ProfileDialog profile={mockProfile} onClose={noop} />
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
