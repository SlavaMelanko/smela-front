import { useOutletContext } from 'react-router-dom'

import { TeamInfoSection } from '@/components/team'

export const TeamGeneralPage = () => {
  const { team } = useOutletContext()

  return <TeamInfoSection team={team} />
}
