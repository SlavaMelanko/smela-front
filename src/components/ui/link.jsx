import { cva } from 'class-variance-authority'
import { Link as RouterLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

const linkVariants = cva(
  'font-medium text-link transition-colors duration-300 hover:text-link-foreground focus:text-link-foreground',
  {
    variants: {
      size: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg'
      },
      underline: {
        hover: 'hover:underline',
        always: 'underline',
        none: ''
      }
    },
    defaultVariants: {
      size: 'default',
      underline: 'hover'
    }
  }
)

function Link({
  to,
  className,
  size = 'default',
  underline = 'hover',
  openInNewTab,
  children,
  ...props
}) {
  return (
    <RouterLink
      to={to}
      className={cn(linkVariants({ size, underline, className }))}
      {...(openInNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

export { Link, linkVariants }
