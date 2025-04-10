import './styles.scss'

import { Outlet } from 'react-router-dom'

import LanguageSelector from '@/components/LanguageSelector'
import ThemeToggle from '@/components/ThemeToggle'

const PublicLayout = () => {
  return (
    <div className='public-layout'>
      <div className='public-layout__fixed-controls'>
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className='public-layout__container'>
        <Outlet />
      </div>
    </div>
  )
}

export default PublicLayout
