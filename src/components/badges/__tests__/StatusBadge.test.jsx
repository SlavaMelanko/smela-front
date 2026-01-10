import { render, screen } from '@testing-library/react'

import { getUserStatusTextColor, UserStatus } from '@/lib/types'

import { StatusBadge } from '../StatusBadge'

describe('StatusBadge', () => {
  it('renders status text', () => {
    render(<StatusBadge status={UserStatus.ACTIVE} />)

    expect(screen.getByText(UserStatus.ACTIVE)).toBeInTheDocument()
  })

  it('applies capitalize class', () => {
    render(<StatusBadge status={UserStatus.ACTIVE} />)

    expect(screen.getByText(UserStatus.ACTIVE)).toHaveClass('capitalize')
  })

  it.each(Object.values(UserStatus))(
    'applies correct color for %s status',
    status => {
      render(<StatusBadge status={status} />)

      expect(screen.getByText(status)).toHaveClass(
        getUserStatusTextColor(status)
      )
    }
  )

  it('applies fallback color for unknown status', () => {
    render(<StatusBadge status='unknown' />)

    expect(screen.getByText('unknown')).toHaveClass('text-muted-foreground')
  })
})
