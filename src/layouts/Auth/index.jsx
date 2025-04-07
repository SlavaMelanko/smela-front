import './styles.scss'

import { Outlet } from 'react-router-dom'

import ThemeToggle from '@/components/ThemeToggle'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__theme-toggle'>
        <ThemeToggle />
      </div>

      <div className='auth-layout__content'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
