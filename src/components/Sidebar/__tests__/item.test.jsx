import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HomeIcon, ProxyIcon } from '@/components/icons'
import { renderWithProviders } from '@/tests'

import SidebarItem from '../Item'

describe('SidebarItem', () => {
  const mockSetActiveItem = jest.fn()

  const simpleItem = {
    title: 'Home',
    icon: HomeIcon,
    url: '/home'
  }

  const itemWithBadge = {
    title: 'Dashboard',
    icon: HomeIcon,
    badge: '5',
    url: '/dashboard'
  }

  const itemWithSubItems = {
    title: 'Proxies',
    icon: ProxyIcon,
    items: [
      { title: 'Residential', badge: '1', url: '/proxies/residential' },
      { title: 'ISP', url: '/proxies/isp' }
    ]
  }

  const externalItem = {
    title: 'Documentation',
    icon: HomeIcon,
    external: true,
    url: 'https://docs.example.com'
  }

  beforeEach(() => {
    mockSetActiveItem.mockClear()
  })

  it('renders item with icon and label', () => {
    renderWithProviders(
      <SidebarItem
        item={simpleItem}
        activeItem='Home'
        setActiveItem={mockSetActiveItem}
      />
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows notification badge when present', () => {
    renderWithProviders(
      <SidebarItem
        item={itemWithBadge}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('applies active class when item is active', () => {
    const { container } = renderWithProviders(
      <SidebarItem
        item={simpleItem}
        activeItem='Home'
        setActiveItem={mockSetActiveItem}
      />
    )

    const mainItem = container.querySelector('.sidebar-item__main')

    expect(mainItem).toHaveClass('sidebar-item__main--active')
  })

  it('does not apply active class when item is not active', () => {
    const { container } = renderWithProviders(
      <SidebarItem
        item={simpleItem}
        activeItem='Other'
        setActiveItem={mockSetActiveItem}
      />
    )

    const mainItem = container.querySelector('.sidebar-item__main')

    expect(mainItem).not.toHaveClass('sidebar-item__main--active')
  })

  it('calls setActiveItem when simple item is clicked', async () => {
    renderWithProviders(
      <SidebarItem
        item={simpleItem}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(mockSetActiveItem).toHaveBeenCalledWith('Home')
  })

  it('does not call setActiveItem for external items', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    renderWithProviders(
      <SidebarItem
        item={externalItem}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(mockSetActiveItem).not.toHaveBeenCalled()
    expect(openSpy).toHaveBeenCalledWith(
      'https://docs.example.com',
      '_blank',
      'noopener,noreferrer'
    )

    openSpy.mockRestore()
  })

  it('shows external icon for external items', () => {
    renderWithProviders(
      <SidebarItem
        item={externalItem}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const externalIcon = document.querySelector(
      '.sidebar-item__additional-icon'
    )

    expect(externalIcon).toBeInTheDocument()
  })

  it('toggles expansion when item with subItems is clicked', async () => {
    const { container } = renderWithProviders(
      <SidebarItem
        item={itemWithSubItems}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const button = screen.getByRole('button', { name: /proxies/i })
    const submenu = container.querySelector('.sidebar-item__submenu')

    expect(submenu).not.toHaveClass('sidebar-item__submenu--open')

    await userEvent.click(button)

    expect(submenu).toHaveClass('sidebar-item__submenu--open')

    await userEvent.click(button)

    expect(submenu).not.toHaveClass('sidebar-item__submenu--open')
  })

  it('renders sub-items when item has subItems', () => {
    renderWithProviders(
      <SidebarItem
        item={itemWithSubItems}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    expect(screen.getByText('Residential')).toBeInTheDocument()
    expect(screen.getByText('ISP')).toBeInTheDocument()
  })

  it('shows chevron icon for items with subItems', () => {
    const { container } = renderWithProviders(
      <SidebarItem
        item={itemWithSubItems}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const chevronIcon = container.querySelector(
      '.sidebar-item__additional-icon'
    )

    expect(chevronIcon).toBeInTheDocument()
  })

  it('rotates chevron icon when expanded', async () => {
    const { container } = renderWithProviders(
      <SidebarItem
        item={itemWithSubItems}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const button = screen.getByRole('button', { name: /proxies/i })
    const chevronIcon = container.querySelector(
      '.sidebar-item__additional-icon'
    )

    expect(chevronIcon).not.toHaveClass(
      'sidebar-item__additional-icon--expanded'
    )

    await userEvent.click(button)

    expect(chevronIcon).toHaveClass('sidebar-item__additional-icon--expanded')
  })

  it('calls setActiveItem when sub-item is clicked', async () => {
    renderWithProviders(
      <SidebarItem
        item={itemWithSubItems}
        activeItem=''
        setActiveItem={mockSetActiveItem}
      />
    )

    const subItemButton = screen.getByRole('button', { name: /residential/i })

    await userEvent.click(subItemButton)

    expect(mockSetActiveItem).toHaveBeenCalledWith('Residential')
  })

  describe('accessibility', () => {
    it('sets aria-current="page" on active item', () => {
      renderWithProviders(
        <SidebarItem
          item={simpleItem}
          activeItem='Home'
          setActiveItem={mockSetActiveItem}
        />
      )

      const button = screen.getByRole('button', { name: /home/i })

      expect(button).toHaveAttribute('aria-current', 'page')
    })

    it('does not set aria-current on inactive item', () => {
      renderWithProviders(
        <SidebarItem
          item={simpleItem}
          activeItem='Other'
          setActiveItem={mockSetActiveItem}
        />
      )

      const button = screen.getByRole('button', { name: /home/i })

      expect(button).not.toHaveAttribute('aria-current')
    })
  })

  describe('edge cases', () => {
    it('renders item without icon', () => {
      const itemWithoutIcon = { title: 'NoIcon', url: '/no-icon' }

      renderWithProviders(
        <SidebarItem
          item={itemWithoutIcon}
          activeItem=''
          setActiveItem={mockSetActiveItem}
        />
      )

      expect(screen.getByText('NoIcon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders item with empty subItems array', () => {
      const itemWithEmptySubItems = {
        title: 'Empty',
        icon: HomeIcon,
        items: []
      }

      const { container } = renderWithProviders(
        <SidebarItem
          item={itemWithEmptySubItems}
          activeItem=''
          setActiveItem={mockSetActiveItem}
        />
      )

      expect(screen.getByText('Empty')).toBeInTheDocument()

      const submenu = container.querySelector('.sidebar-item__submenu')

      expect(submenu).not.toBeInTheDocument()
    })
  })
})
