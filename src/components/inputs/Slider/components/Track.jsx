import { Slider } from '@/components/ui/slider'

const Track = ({ value, onChange, min, max, step, progress }) => (
  <div className='relative mt-2'>
    <Slider
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      style={{ '--slider-progress': `${progress}%` }}
    />
  </div>
)

export default Track
