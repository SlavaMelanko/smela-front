import { memo } from 'react'

const Range = memo(({ tickLabels }) => {
  if (!tickLabels?.length) {
    return null
  }

  return (
    <div className='mb-2 flex items-center justify-between'>
      {tickLabels.map((label, index) => (
        <span key={index} className='text-base font-normal text-foreground'>
          {label}
        </span>
      ))}
    </div>
  )
})

Range.displayName = 'Range'

export default Range
