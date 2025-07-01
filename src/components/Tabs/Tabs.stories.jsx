import './styles.scss'

import CustomTabs from './index'

export default {
  title: 'Components/Tabs',
  component: CustomTabs,
  parameters: {
    layout: 'centered'
  }
}

const tabs = [
  {
    label: 'Tab One',
    value: 'one',
    children: <div>Content for Tab One</div>
  },
  {
    label: 'Tab Two',
    value: 'two',
    children: <div>Content for Tab Two</div>
  },
  {
    label: 'Tab Three',
    value: 'three',
    children: <div>Content for Tab Three</div>
  }
]

export const Default = {
  args: {
    tabs,
    defaultValue: 'one'
  },
  render: args => <CustomTabs {...args} />
}
