import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

const Feature = ({ icon, text }) => (
  <Tooltip>
    <TooltipTrigger className='flex cursor-help items-center justify-center rounded-full border-none bg-transparent p-1 transition-colors hover:bg-border'>
      {icon}
    </TooltipTrigger>
    <TooltipContent>{text}</TooltipContent>
  </Tooltip>
)

export default Feature
