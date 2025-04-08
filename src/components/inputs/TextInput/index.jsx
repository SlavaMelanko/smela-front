import Input from '../Input'

const TextInput = ({ name, onChange, onBlur, value, ...props }) => {
  return (
    <Input
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      {...props}
      type='text'
    />
  )
}

export default TextInput
