import Checkbox from './index'

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'error'],
      description: 'Color variant of the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state'
    },
    children: {
      control: 'text',
      description: 'Label text'
    }
  },
  args: {
    size: 'md',
    variant: 'default',
    disabled: false,
    children: 'Default checkbox'
  }
}

export const Default = {
  args: {
    children: 'Default checkbox'
  },
  parameters: {
    controls: {
      include: ['children', 'size', 'variant', 'disabled', 'checked']
    }
  }
}
