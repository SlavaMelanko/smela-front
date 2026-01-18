import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui'

export const PrevButton = ({ onClick, disabled }) => (
  <Button
    variant='ghost'
    size='icon'
    className='size-11'
    onClick={onClick}
    disabled={disabled}
  >
    <ChevronLeft className='size-4' />
  </Button>
)
