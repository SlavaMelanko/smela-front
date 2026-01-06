import { Button } from '@/components/ui/button'

const Action = ({ children, onClick }) => (
  <Button className='w-full' variant='outline' onClick={onClick}>
    {children}
  </Button>
)

export default Action
