import { memo } from 'react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const PresetValue = memo(({ value, label, isActive, onSelect }) => (
  <Button
    variant='ghost'
    size='sm'
    onClick={() => onSelect(value)}
    className={cn(
      'font-light text-muted-foreground',
      isActive && 'text-foreground'
    )}
  >
    {label}
  </Button>
))

PresetValue.displayName = 'PresetValue'

const PresetValues = memo(({ values, activeValue, onSelect }) => {
  if (!values?.length) {
    return null
  }

  return (
    <div className='mt-4 flex flex-wrap items-center justify-center gap-1'>
      {values.map(({ value, label }) => (
        <PresetValue
          key={value}
          value={value}
          label={label}
          isActive={activeValue === value}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
})

PresetValues.displayName = 'PresetValues'

export default PresetValues
