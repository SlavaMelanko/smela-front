import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const promptVariants = cva('text-muted-foreground text-center', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
})

function Prompt({ className, size, children, ...props }) {
  return (
    <p className={cn(promptVariants({ size }), className)} {...props}>
      {children}
    </p>
  )
}

export { Prompt, promptVariants }
