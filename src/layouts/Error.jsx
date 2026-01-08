import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import LanguageDropdown from '@/components/LanguageDropdown'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

const ErrorLayout = () => (
  <div className='relative flex min-h-screen flex-col items-center justify-center bg-background p-4'>
    <div className='absolute right-4 top-4 z-4 flex gap-4 md:right-8 md:top-8'>
      <ThemeToggle />
      <LanguageDropdown />
    </div>

    <div className='flex w-full max-w-md flex-col gap-8'>
      <main className='px-8'>
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

export default ErrorLayout
