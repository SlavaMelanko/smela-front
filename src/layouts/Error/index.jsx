import './styles.scss'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Copyright from '@/components/Copyright'
import { LanguageDropdown } from '@/components/dropdowns'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const ErrorLayout = () => {
  return (
    <div className='error-layout'>
      <div className='error-layout__user-preferences'>
        <ThemeToggle />
        <LanguageDropdown />
      </div>

      <div className='error-layout__container'>
        <main className='error-layout__content'>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>

        <footer className='error-layout__footer'>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

export default ErrorLayout
