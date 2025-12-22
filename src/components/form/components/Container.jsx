import { cn } from '@/lib/utils'

const Container = ({ children, hasError, className }) => (
  <div className={cn('relative flex flex-col', hasError && 'mb-4', className)}>
    {children}
  </div>
)

export default Container
