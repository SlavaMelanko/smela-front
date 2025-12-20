import './styles.scss'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Copyright from '@/components/Copyright'
import { LanguageDropdown } from '@/components/dropdowns'
import { Logo } from '@/components/icons'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__user-preferences'>
        <ThemeToggle />
        <LanguageDropdown />
      </div>

      <div className='auth-layout__container'>
        <header className='auth-layout__header'>
          <Logo width={280} />
        </header>

        <main className='auth-layout__content'>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>

        <footer className='auth-layout__footer'>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

export default AuthLayout
