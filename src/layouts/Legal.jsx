import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { Logo } from '@/components/icons'
import LanguageDropdown from '@/components/LanguageDropdown'
import Spinner from '@/components/Spinner'
import ThemeToggle from '@/components/ThemeToggle'

import { CenteredPage, PageContent, TopRightControls } from './containers'

const LegalLayout = () => (
  <CenteredPage>
    <TopRightControls>
      <ThemeToggle />
      <LanguageDropdown />
    </TopRightControls>

    <PageContent className='grow max-w-5xl'>
      <header className='flex items-center justify-center text-foreground'>
        <Logo width={280} />
      </header>

      <main className='grow w-full p-4'>
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

export default LegalLayout
