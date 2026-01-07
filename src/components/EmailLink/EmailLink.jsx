import { linkVariants } from '@/components/ui/link'
import { cn } from '@/lib/utils'

export const EmailLink = ({ email, className, size, underline, children }) => {
  return (
    <a
      href={`mailto:${email}`}
      className={cn(linkVariants({ size, underline, className }))}
    >
      {children ?? email}
    </a>
  )
}
