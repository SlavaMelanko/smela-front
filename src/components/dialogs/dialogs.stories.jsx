import { Dialog, dialogContentVariants } from '@/components/ui/dialog'

import { PricingSliderDialog } from '.'

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

export const PricingSlider = {
  args: { size: 'lg' },
  render: ({ size }) => (
    <DialogWrapper size={size}>
      <PricingSliderDialog onComplete={noop} onClose={noop} />
    </DialogWrapper>
  )
}
