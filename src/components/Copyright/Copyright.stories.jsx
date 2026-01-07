import { Copyright } from '.'

export default {
  title: 'Components/Copyright',
  component: Copyright,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg']
    }
  },
  args: { size: 'xs' }
}

export const Default = {}
