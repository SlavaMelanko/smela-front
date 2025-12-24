import { cn } from '@/lib/utils'

const formatPrice = (price, unit) => `${price} / ${unit}`

const PricePerUnit = ({ original, final, unit, className = '' }) => {
  const hasDiscount = !!final && final < original

  return (
    <p className={cn('text-center text-base text-muted-foreground', className)}>
      {hasDiscount ? (
        <>
          <span className='mr-2 text-muted-foreground line-through'>
            {original}
          </span>
          {formatPrice(final, unit)}
        </>
      ) : (
        formatPrice(original, unit)
      )}
    </p>
  )
}

export default PricePerUnit
