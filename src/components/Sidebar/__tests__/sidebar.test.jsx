import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HomeIcon, ProxyIcon, SettingsIcon } from '@/components/icons'
import { renderWithProviders } from '@/tests'

import AppSidebar from '..'

const testMenuItems = [
  { title: 'Home', url: '/home', icon: HomeIcon },
  {
    title: 'Proxies',
    icon: ProxyIcon,
    items: [
      { title: 'Residential', url: '/proxies/residential' },
      { title: 'ISP', url: '/proxies/isp' },
      { title: 'SERP API', url: '/proxies/serp-api' }
    ]
  },
  { title: 'Documentation', icon: SettingsIcon, external: true },
  { title: 'Settings', url: '/settings', icon: SettingsIcon }
]

describe('AppSidebar', () => {
  it('renders all menu items', () => {
    renderWithProviders(<AppSidebar isOpen items={testMenuItems} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Proxies')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders sub-items for Proxies', () => {
    renderWithProviders(<AppSidebar isOpen items={testMenuItems} />)

    expect(screen.getByText('Residential')).toBeInTheDocument()
    expect(screen.getByText('ISP')).toBeInTheDocument()
    expect(screen.getByText('SERP API')).toBeInTheDocument()
  })

  it('applies collapsed class when isOpen is false', () => {
    const { container } = renderWithProviders(
      <AppSidebar isOpen={false} items={testMenuItems} />
    )

    const sidebar = container.querySelector('.app-sidebar')

    expect(sidebar).toHaveClass('app-sidebar--collapsed')
  })

  it('does not apply collapsed class when isOpen is true', () => {
    const { container } = renderWithProviders(
      <AppSidebar isOpen items={testMenuItems} />
    )

    const sidebar = container.querySelector('.app-sidebar')

    expect(sidebar).not.toHaveClass('app-sidebar--collapsed')
  })

  it('sets Home as initial active item', () => {
    renderWithProviders(<AppSidebar isOpen items={testMenuItems} />)

    const homeButton = screen.getByRole('button', { name: /home/i })
    const activeItem = homeButton.closest('.sidebar-item__main')

    expect(activeItem).toHaveClass('sidebar-item__main--active')
  })

  it('changes active item when clicked', async () => {
    renderWithProviders(<AppSidebar isOpen items={testMenuItems} />)

    const residentialButton = screen.getByRole('button', {
      name: /residential/i
    })

    await userEvent.click(residentialButton)

    const activeSubItem = residentialButton.closest('.sidebar-sub-item')

    expect(activeSubItem).toHaveClass('sidebar-sub-item--active')
  })

  it('renders copyright in footer', () => {
    renderWithProviders(<AppSidebar isOpen items={testMenuItems} />)

    const footer = document.querySelector('.app-sidebar__footer')

    expect(footer).toBeInTheDocument()
  })
})
