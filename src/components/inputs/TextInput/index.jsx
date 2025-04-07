import Input from '../Input'

const TextInput = ({ name, register, ...props }) => {
  return <Input {...register(name)} {...props} type='text' />
}

export default TextInput
