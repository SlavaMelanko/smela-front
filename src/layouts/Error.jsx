import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Copyright } from '@/components/Copyright'
import { LanguageDropdown } from '@/components/LanguageDropdown'
import Spinner from '@/components/Spinner'
import { ThemeToggle } from '@/components/ThemeToggle'

import { CenteredPage, PageContent, TopRightControls } from './containers'

const ErrorLayout = () => (
  <CenteredPage>
    <TopRightControls>
      <ThemeToggle />
      <LanguageDropdown />
    </TopRightControls>

    <PageContent className='max-w-md'>
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

export default ErrorLayout
