import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/tests'

import { TeamBadge } from '../TeamBadge'

const mockTeam = {
  name: 'Engineering Team',
  position: 'Senior Developer'
}

describe('TeamBadge', () => {
  it('renders team name', () => {
    renderWithProviders(<TeamBadge team={mockTeam} />)

    expect(screen.getByText('Engineering Team')).toBeInTheDocument()
  })

  it('renders team position', () => {
    renderWithProviders(<TeamBadge team={mockTeam} />)

    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
  })

  it('renders default position when position is missing', () => {
    const teamWithoutPosition = { name: 'Design Team' }

    renderWithProviders(<TeamBadge team={teamWithoutPosition} />)

    expect(screen.getByText('Team member')).toBeInTheDocument()
  })

  it('renders as a link to /team', () => {
    renderWithProviders(<TeamBadge team={mockTeam} />)

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', '/team')
  })

  it('renders team icon', () => {
    renderWithProviders(<TeamBadge team={mockTeam} />)

    const link = screen.getByRole('link')
    const icon = link.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('lucide-users')
  })
})
