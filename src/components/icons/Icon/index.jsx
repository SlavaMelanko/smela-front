import clsx from 'clsx'

const BaseIcon = ({
  icon: IconComponent,
  name = 'icon',
  size = 'md',
  color = 'primary',
  className,
  ...rest
}) => {
  return (
    <IconComponent
      {...rest}
      className={clsx(
        `${name}-icon`,
        `${name}-icon--${size}`,
        `${name}-icon--${color}`,
        className
      )}
    />
  )
}

export default BaseIcon
