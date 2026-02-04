import { Inbox } from 'lucide-react'

import { StateIcon, StateRoot, StateTitle } from './State'

export const EmptyState = ({ text, className, children }) => (
  <StateRoot className={className}>
    <StateIcon icon={Inbox} />
    <StateTitle>{text}</StateTitle>
    {children}
  </StateRoot>
)
