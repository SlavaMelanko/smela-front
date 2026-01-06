import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import useTheme from '@/hooks/useTheme'

const Toaster = () => {
  const { theme } = useTheme()

  return <SonnerToaster theme={theme} position='top-center' closeButton />
}

export default Toaster
