import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { LanguageDropdown } from '@/components/LanguageDropdown'
import { Spinner } from '@/components/Spinner'
import { ThemeToggle } from '@/components/ThemeToggle'

import { CenteredPage, PageContent, TopRightControls } from './containers'

export const PublicLayout = () => (
  <CenteredPage>
    <TopRightControls>
      <ThemeToggle />
      <LanguageDropdown />
    </TopRightControls>

    <PageContent className='max-w-7xl'>
      <main className='mt-16'>
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
