import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui'

export const NextButton = ({ onClick, disabled }) => (
  <Button
    variant='ghost'
    size='icon'
    className='size-11'
    onClick={onClick}
    disabled={disabled}
  >
    <ChevronRight className='size-4' />
  </Button>
)
