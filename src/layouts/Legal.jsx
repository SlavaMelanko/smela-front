import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { Logo } from '@/components/icons'
import LanguageDropdown from '@/components/LanguageDropdown'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const LegalLayout = () => (
  <div className='relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16'>
    <div className='absolute right-4 top-4 z-4 flex gap-4 md:right-8 md:top-8'>
      <ThemeToggle />
      <LanguageDropdown />
    </div>

    <div className='mx-auto flex w-full max-w-5xl grow flex-col items-center gap-8'>
      <header className='flex items-center justify-center text-foreground'>
        <Logo width={280} />
      </header>

      <main className='w-full grow p-4'>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  </div>
)

export default LegalLayout
