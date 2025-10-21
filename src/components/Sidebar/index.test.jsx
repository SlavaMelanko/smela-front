import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'

import AppSidebar from './index'

describe('AppSidebar', () => {
  it('renders all menu items', () => {
    renderWithProviders(<AppSidebar isOpen />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Proxies')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('User settings & preferences')).toBeInTheDocument()
  })

  it('renders sub-items for Proxies', () => {
    renderWithProviders(<AppSidebar isOpen />)

    expect(screen.getByText('Residential')).toBeInTheDocument()
    expect(screen.getByText('ISP')).toBeInTheDocument()
    expect(screen.getByText('SERP API')).toBeInTheDocument()
  })

  it('applies collapsed class when isOpen is false', () => {
    const { container } = renderWithProviders(<AppSidebar isOpen={false} />)

    const sidebar = container.querySelector('.app-sidebar')

    expect(sidebar).toHaveClass('app-sidebar--collapsed')
  })

  it('does not apply collapsed class when isOpen is true', () => {
    const { container } = renderWithProviders(<AppSidebar isOpen />)

    const sidebar = container.querySelector('.app-sidebar')

    expect(sidebar).not.toHaveClass('app-sidebar--collapsed')
  })

  it('sets Home as initial active item', () => {
    renderWithProviders(<AppSidebar isOpen />)

    const homeButton = screen.getByRole('button', { name: /home/i })
    const activeItem = homeButton.closest('.sidebar-item__main')

    expect(activeItem).toHaveClass('sidebar-item__main--active')
  })

  it('changes active item when clicked', async () => {
    renderWithProviders(<AppSidebar isOpen />)

    const residentialButton = screen.getByRole('button', {
      name: /residential/i
    })

    await userEvent.click(residentialButton)

    const activeSubItem = residentialButton.closest('.sidebar-sub-item')

    expect(activeSubItem).toHaveClass('sidebar-sub-item--active')
  })

  it('renders copyright in footer', () => {
    renderWithProviders(<AppSidebar isOpen />)

    const footer = document.querySelector('.app-sidebar__footer')

    expect(footer).toBeInTheDocument()
  })
})
