import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { Logo } from '@/components/icons'
import { LanguageDropdown } from '@/components/LanguageDropdown'
import { Spinner } from '@/components/Spinner'
import { ThemeToggle } from '@/components/ThemeToggle'

import { CenteredPage, PageContent, TopRightControls } from './containers'

const AuthLayout = () => (
  <CenteredPage>
    <TopRightControls>
      <ThemeToggle />
      <LanguageDropdown />
    </TopRightControls>

    <PageContent className='max-w-md'>
      <header className='flex items-center justify-center text-foreground'>
        <Logo size='lg' />
      </header>

      <main className='px-8'>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>

      <footer>
        <Copyright />
      </footer>
    </PageContent>
  </CenteredPage>
)

export default AuthLayout
