import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Spinner from '@/components/Spinner'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import useSidebarMenu from '@/hooks/useSidebarMenu'
import { cn } from '@/lib/utils'

const UserLayout = () => {
  const isDesktop = useIsDesktop()
  const { items } = useSidebarMenu()
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop)

  useEffect(() => {
    setIsSidebarOpen(isDesktop)
  }, [isDesktop])

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className='flex flex-col h-screen'>
      <header className='z-10 flex shrink-0 items-center h-11 px-4 md:px-6 bg-sidebar border-b border-sidebar-border'>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </header>

      <div className='flex flex-1 min-h-0'>
        <aside
          className={cn(
            'w-64 overflow-hidden transition-[width] duration-300 ease-in-out',
            !isSidebarOpen && 'w-0 delay-300'
          )}
        >
          <Sidebar isOpen={isSidebarOpen} items={items} />
        </aside>

        <main className='flex flex-col flex-1 p-4 overflow-auto'>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default UserLayout
