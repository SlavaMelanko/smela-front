import { useOutletContext } from 'react-router-dom'

import { TeamInfo } from '@/components/team'

export const TeamInfoPage = () => {
  const { team } = useOutletContext()

  return <TeamInfo team={team} />
}
