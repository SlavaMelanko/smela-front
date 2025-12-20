import { Spinner as ShadcnSpinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const sizeMap = { sm: 16, md: 24, lg: 32, xl: 48 }

const Spinner = ({ text, size = 'md', className, ...props }) => (
  <div
    className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      className
    )}
  >
    <div className='flex flex-col items-center gap-2'>
      <ShadcnSpinner size={sizeMap[size]} {...props} />
      {text && <span className='text-sm text-muted-foreground'>{text}</span>}
    </div>
  </div>
)

export default Spinner
