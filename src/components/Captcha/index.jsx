import './styles.scss'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useContext } from 'react'

import ThemeContext from '@/contexts/ThemeContext'

const Captcha = ({ setToken }) => {
  const themeData = useContext(ThemeContext)
  const { theme } = themeData

  return (
    <div className='captcha-container'>
      <HCaptcha
        sitekey='10000000-ffff-ffff-ffff-000000000001'
        onVerify={setToken}
        onError={() => setToken(null)}
        onExpire={() => setToken(null)}
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}

export default Captcha
