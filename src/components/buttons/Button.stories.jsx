import './Primary/styles.scss'
import './Offer/styles.scss'
import './OAuth/styles.scss'

import {
  GoogleOAuthButton,
  OfferButton,
  PrimaryButton,
  SecondaryButton
} from './index'

export default {
  title: 'Button',
  component: PrimaryButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outlined']
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'solid',
    disabled: false
  },
  render: args => <PrimaryButton {...args} />
}

export const Secondary = {
  args: {
    children: 'Secondary Button',
    disabled: false
  },
  render: args => <SecondaryButton {...args} />
}

export const Offer = {
  args: {
    children: 'SIGN UP NOW',
    variant: 'solid',
    disabled: false
  },
  render: args => <OfferButton {...args} />
}

export const OAuth = {
  args: {
    text: 'Sign in with Google',
    disabled: false
  },
  render: args => <GoogleOAuthButton {...args} />
}
