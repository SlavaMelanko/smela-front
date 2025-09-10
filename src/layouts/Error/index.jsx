import './styles.scss'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Copyright from '@/components/Copyright'
import { LanguageSelector } from '@/components/dropdowns'
import { Logo } from '@/components/icons'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const ErrorLayout = () => {
  return (
    <div className='error-layout'>
      <div className='error-layout__user-preferences'>
        <ThemeToggle />
        <LanguageSelector />
      </div>

      <div className='error-layout__container'>
        <header className='error-layout__header'>
          <Logo width={240} height={45} />
        </header>

        <main className='error-layout__content'>
          <Suspense fallback={<Spinner centered />}>
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
