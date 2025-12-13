import './styles.scss'

import clsx from 'clsx'
import { MultiSelect } from 'react-multi-select-component'

const Multiselect = ({
  options,
  value,
  onChange,
  labelledBy,
  className,
  error,
  disabled,
  ...rest
}) => {
  return (
    <div
      className={clsx('multiselect', error && 'multiselect--error', className)}
    >
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy={labelledBy}
        disabled={disabled}
        {...rest}
      />
    </div>
  )
}

export default Multiselect
