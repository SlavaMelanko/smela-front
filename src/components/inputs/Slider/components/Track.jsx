import { Slider } from '@/components/ui/slider'

const Track = ({ value, onChange, min, max, step }) => (
  <div className='relative mt-2'>
    <Slider
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
    />
  </div>
)

export default Track
