import { cn } from '@/lib/utils'

const Error = ({ message, className }) => (
  <div
    className={cn(
      'absolute top-full overflow-hidden text-sm text-destructive whitespace-nowrap transition-all duration-200',
      message ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
      className
    )}
    role={message ? 'alert' : undefined}
    aria-live='polite'
  >
    {message}
  </div>
)

export default Error
