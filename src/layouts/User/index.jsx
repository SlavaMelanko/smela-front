import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Spinner from '@/components/Spinner'
import { SidebarInset, SidebarProvider } from '@/components/ui'
import useSidebarMenu from '@/hooks/useSidebarMenu'

const UserLayout = () => {
  const { items } = useSidebarMenu()

  return (
    <SidebarProvider>
      <Sidebar items={items} />
      <SidebarInset>
        <header className='z-10 flex shrink-0 items-center h-11 px-4 md:px-6 bg-sidebar border-b border-sidebar-border'>
          <Header />
        </header>
        <main className='flex flex-col flex-1 p-4 overflow-auto'>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default UserLayout
