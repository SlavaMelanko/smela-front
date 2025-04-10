import './styles.scss'

import { Outlet } from 'react-router-dom'

import { MassiveLogo } from '@/components/icons'
import LanguageSelector from '@/components/LanguageSelector'
import ThemeToggle from '@/components/ThemeToggle'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__fixed-controls'>
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className='auth-layout__container'>
        <div className='auth-layout__content'>
          <div className='auth-layout__logo'>
            <MassiveLogo width={240} height={45} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
