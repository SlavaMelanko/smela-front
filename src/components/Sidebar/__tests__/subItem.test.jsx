import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'

import SidebarSubItem from '../SubItem'

describe('SidebarSubItem', () => {
  const mockItem = {
    name: 'Residential'
  }

  it('renders with label', () => {
    renderWithProviders(
      <SidebarSubItem item={mockItem} isActive={false} onClick={jest.fn()} />
    )

    expect(screen.getByText('Residential')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows notification badge when present', () => {
    const itemWithBadge = { ...mockItem, badge: '3' }

    renderWithProviders(
      <SidebarSubItem
        item={itemWithBadge}
        isActive={false}
        onClick={jest.fn()}
      />
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('applies active class when isActive is true', () => {
    const { container } = renderWithProviders(
      <SidebarSubItem item={mockItem} isActive onClick={jest.fn()} />
    )

    const subItem = container.querySelector('.sidebar-sub-item')

    expect(subItem).toHaveClass('sidebar-sub-item--active')
  })

  it('does not apply active class when isActive is false', () => {
    const { container } = renderWithProviders(
      <SidebarSubItem item={mockItem} isActive={false} onClick={jest.fn()} />
    )

    const subItem = container.querySelector('.sidebar-sub-item')

    expect(subItem).not.toHaveClass('sidebar-sub-item--active')
  })

  it('calls onClick when button is clicked', async () => {
    const handleClick = jest.fn()

    renderWithProviders(
      <SidebarSubItem item={mockItem} isActive={false} onClick={handleClick} />
    )

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
