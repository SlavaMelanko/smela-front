import useTheme from '@/hooks/useTheme'

const Logo = ({ width, height, className = '' }) => {
  const { theme } = useTheme()

  return (
    <img
      src={`/logo-with-text-${theme}.png`}
      alt='Logo'
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

export default Logo
