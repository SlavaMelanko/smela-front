import { render, screen } from '@testing-library/react'

import { Role } from '@/lib/types'

import { RoleBadge } from '../RoleBadge'

describe('RoleBadge', () => {
  it('renders role text', () => {
    render(<RoleBadge role={Role.ADMIN} />)

    expect(screen.getByText(Role.ADMIN)).toBeInTheDocument()
  })

  it('applies capitalize class', () => {
    render(<RoleBadge role={Role.USER} />)

    expect(screen.getByText(Role.USER)).toHaveClass('capitalize')
  })
})
