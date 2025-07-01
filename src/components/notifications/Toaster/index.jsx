import './styles.scss'

import { ToastContainer } from 'react-toastify'

import useTheme from '@/hooks/useTheme'

const defaultOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  limit: 2,
  newestOnTop: true,
  pauseOnFocusLoss: true
}

const Toaster = () => {
  const { theme } = useTheme()

  return <ToastContainer {...defaultOptions} theme={theme} />
}

export default Toaster
