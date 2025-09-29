import './styles.scss'

import clsx from 'clsx'
import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Spinner from '@/components/Spinner'
import { useIsDesktop } from '@/hooks/useMediaQuery'

const UserLayout = () => {
  const isDesktop = useIsDesktop()
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop)

  useEffect(() => {
    setIsSidebarOpen(isDesktop)
  }, [isDesktop])

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className='user-layout'>
      <header className='user-layout__header'>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </header>

      <div className='user-layout__main'>
        <aside
          className={clsx('user-layout__sidebar', {
            'user-layout__sidebar--collapsed': !isSidebarOpen
          })}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </aside>

        <main className='user-layout__content'>
          <Suspense fallback={<Spinner centered />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default UserLayout
