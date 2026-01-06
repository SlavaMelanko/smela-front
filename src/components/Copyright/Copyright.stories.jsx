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

export const AllSizes = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Copyright size='xs' />
      <Copyright size='sm' />
      <Copyright size='default' />
      <Copyright size='lg' />
    </div>
  )
}
