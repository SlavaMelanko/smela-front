import { cn } from '@/lib/utils'

const PageContent = ({ children, className }) => (
  <div className={cn('flex w-full flex-col gap-12', className)}>{children}</div>
)

export default PageContent
