import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Separator
} from '@/components/ui'
import useLocale from '@/hooks/useLocale'

export const PricingFaq = () => {
  const { t } = useLocale({ keyPrefix: 'offer.faq' })
  const items = t('items', { returnObjects: true })

  return (
    <div className='flex flex-col gap-4 md:gap-5 lg:gap-6'>
      <h2 className='text-center text-lg font-semibold text-foreground'>
        {t('title')}
      </h2>

      <Accordion className='mx-auto max-w-2xl'>
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            {index > 0 && <Separator />}
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
