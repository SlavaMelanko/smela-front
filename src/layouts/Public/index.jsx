import './styles.scss'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Copyright from '@/components/Copyright'
import { LanguageDropdown } from '@/components/dropdowns'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const PublicLayout = () => {
  return (
    <div className='public-layout'>
      <div className='public-layout__user-preferences'>
        <ThemeToggle />
        <LanguageDropdown />
      </div>

      <div className='public-layout__container'>
        <main className='public-layout__content'>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>

        <footer className='public-layout__footer'>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

export default PublicLayout
