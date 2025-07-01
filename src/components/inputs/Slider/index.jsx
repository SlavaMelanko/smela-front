import './styles.scss'

import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const Slider = ({ value = 1, onChange, min, max, presetValues, unit }) => {
  const { formatNumber } = useLocale()

  const labels = [min, Math.floor(max / 2), max]
  const progress = (value / max) * 100

  const handleRangeChange = e => {
    onChange(+e.target.value)
  }

  const handlePresetSelect = val => {
    onChange(val)
  }

  const formatWithUnit = val => `${formatNumber(val)} ${unit}`

  return (
    <div className='slider'>
      <div className='slider__labels'>
        {labels.map(val => (
          <span key={val} className='slider__label'>
            {formatWithUnit(val)}
          </span>
        ))}
      </div>

      <div className='slider__track'>
        <div className='slider__track-bg' />
        <div className='slider__progress' style={{ width: `${progress}%` }} />
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={handleRangeChange}
          className='slider__input'
        />
      </div>

      <div className='slider__presets'>
        {presetValues.map(val => (
          <button
            key={val}
            onClick={() => handlePresetSelect(val)}
            className={clsx('slider__preset', {
              'slider__preset--active': value === val
            })}
          >
            {formatWithUnit(val)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Slider
