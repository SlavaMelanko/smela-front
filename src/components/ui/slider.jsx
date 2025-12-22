import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Slider = forwardRef(
  (
    { className, value, onValueChange, min = 0, max = 100, step = 1, ...props },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      className={cn('relative w-full touch-none', className)}
      {...props}
    >
      <SliderPrimitive.Control className='relative flex h-5 w-full items-center'>
        <SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-border'>
          <SliderPrimitive.Indicator className='absolute h-full bg-primary' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='block size-4 cursor-pointer rounded-full border-none bg-primary shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
)

Slider.displayName = 'Slider'

export { Slider }
