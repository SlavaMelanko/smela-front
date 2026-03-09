import { useOutletContext } from 'react-router-dom'

import { TeamInfoSection } from '@/components/team'

export const TeamInfoPage = () => {
  const { team } = useOutletContext()

  return <TeamInfoSection team={team} />
}
