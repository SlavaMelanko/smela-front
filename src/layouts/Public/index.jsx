import './styles.scss'

import { Outlet } from 'react-router-dom'

import ThemeToggle from '@/components/ThemeToggle'

const PublicLayout = () => {
  return (
    <div className='public-layout'>
      <div className='public-layout__theme-toggle'>
        <ThemeToggle />
      </div>

      <div className='public-layout__container'>
        <Outlet />
      </div>
    </div>
  )
}

export default PublicLayout
