import { Button } from '@/components/ui'

export const Action = ({ children, onClick }) => (
  <Button className='w-full' variant='outline' onClick={onClick}>
    {children}
  </Button>
)
