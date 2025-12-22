import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

import { Button } from '../../ui/button'
import { Slider as BaseSlider } from '../../ui/slider'

const Slider = ({ value = 1, onChange, min, max, presetValues, unit }) => {
  const { formatNumberWithUnit } = useLocale()

  const labels = [min, Math.floor(max / 2), max]
  const progress = ((value - min) / (max - min)) * 100

  const handleValueChange = newValue => {
    onChange(newValue)
  }

  return (
    <div className='w-full'>
      <div className='mb-2 flex items-center justify-between'>
        {labels.map(val => (
          <span key={val} className='text-base font-normal text-foreground'>
            {formatNumberWithUnit(val, unit)}
          </span>
        ))}
      </div>

      <div className='relative mt-2'>
        <BaseSlider
          value={value}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          style={{ '--slider-progress': `${progress}%` }}
        />
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-center gap-1'>
        {presetValues.map(val => (
          <Button
            key={val}
            variant='ghost'
            size='sm'
            onClick={() => onChange(val)}
            className={cn(
              'font-light text-muted-foreground',
              value === val && 'text-foreground'
            )}
          >
            {formatNumberWithUnit(val, unit)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Slider
