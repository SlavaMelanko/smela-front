import { useMemo } from 'react'

import useLocale from '@/hooks/useLocale'

import { PresetValues } from './PresetValues'
import { Range } from './Range'
import { generateTicks } from './ticks'
import { Track } from './Track'

export const Slider = ({
  value = 1,
  onChange,
  min,
  max,
  step,
  tickCount = 2,
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

  return (
    <div className='w-full'>
      <Range tickLabels={tickLabels} />
      <Track
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <PresetValues
        values={presetLabels}
        activeValue={value}
        onSelect={onChange}
      />
    </div>
  )
}
