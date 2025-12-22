import { useMemo } from 'react'

import useLocale from '@/hooks/useLocale'

import { PresetValues, Range, Track } from './components'
import { generateTicks } from './ticks'

const Slider = ({
  value = 1,
  onChange,
  min,
  max,
  step,
  tickCount = 3,
  presetValues,
  unit
}) => {
  const { formatNumberWithUnit } = useLocale()

  const tickLabels = useMemo(
    () =>
      generateTicks(min, max, tickCount).map(val =>
        formatNumberWithUnit(val, unit)
      ),
    [min, max, tickCount, unit, formatNumberWithUnit]
  )

  const presetLabels = useMemo(
    () =>
      presetValues?.map(val => ({
        value: val,
        label: formatNumberWithUnit(val, unit)
      })),
    [presetValues, unit, formatNumberWithUnit]
  )

  const progress = ((value - min) / (max - min)) * 100

  return (
    <div className='w-full'>
      <Range tickLabels={tickLabels} />
      <Track
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        progress={progress}
      />
      <PresetValues
        values={presetLabels}
        activeValue={value}
        onSelect={onChange}
      />
    </div>
  )
}

export default Slider
