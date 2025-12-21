import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export { Separator }

export const TextSeparator = ({ text, className }) => (
  <div className={cn('relative', className)}>
    <div className='absolute inset-0 flex items-center'>
      <Separator className='w-full' />
    </div>
    <div className='relative flex justify-center'>
      <span className='bg-background text-muted-foreground px-2 text-sm'>
        {text}
      </span>
    </div>
  </div>
)
