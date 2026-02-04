import { cn } from '@/lib/utils'

export const LayoutRoot = ({ children }) => (
  <div className='relative flex min-h-screen flex-col items-center justify-center overflow-y-auto bg-background p-8'>
    {children}
  </div>
)

export const LayoutContent = ({ children, className }) => (
  <div className={cn('flex w-full flex-col gap-12', className)}>{children}</div>
)

export const LayoutTopRightControls = ({ children }) => (
  <div className='absolute top-4 right-4 z-10 flex gap-4 md:top-8 md:right-8'>
    {children}
  </div>
)
