import { cn } from '@/lib/utils'

const TotalPrice = ({ original, final, className = '' }) => {
  const hasDiscount = !!final && final < original

  return (
    <div className={cn('flex items-baseline justify-center', className)}>
      {hasDiscount ? (
        <>
          <span className='mr-2 text-base text-muted-foreground line-through'>
            {original}
          </span>
          <span className='text-2xl font-bold text-foreground'>{final}</span>
        </>
      ) : (
        <span className='text-2xl font-bold text-foreground'>{original}</span>
      )}
    </div>
  )
}

export default TotalPrice
