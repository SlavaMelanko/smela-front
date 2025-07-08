import './styles.scss'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Copyright from '@/components/Copyright'
import { LanguageSelector } from '@/components/dropdowns'
import { MassiveLogo } from '@/components/icons'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const LegalLayout = () => (
  <div className='legal-layout'>
    <div className='legal-layout__user-preferences'>
      <ThemeToggle />
      <LanguageSelector />
    </div>

    <div className='legal-layout__container'>
      <header className='legal-layout__header'>
        <MassiveLogo width={240} height={45} />
      </header>

      <main className='legal-layout__content'>
        <Suspense fallback={<Spinner centered />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className='legal-layout__footer'>
        <Copyright />
      </footer>
    </div>
  </div>
)

export default LegalLayout
