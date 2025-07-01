import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'

import Checkbox from './index'

const FormWithCheckbox = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { acceptTerms: false }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox {...register('acceptTerms')}>Accept terms</Checkbox>
      <button type='submit'>Submit</button>
    </form>
  )
}

describe('Checkbox', () => {
  it('renders children', () => {
    render(<Checkbox>Accept terms</Checkbox>)

    expect(screen.getByText(/accept terms/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn()

    render(<Checkbox onChange={handleChange}>Label</Checkbox>)

    const input = screen.getByRole('checkbox')

    fireEvent.click(input)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('supports controlled checked prop', () => {
    render(
      <Checkbox name='test' checked readOnly>
        Label
      </Checkbox>
    )

    const input = screen.getByRole('checkbox')

    expect(input).toBeChecked()
    expect(input).toHaveAttribute('name', 'test')
  })

  it('applies className to root element', () => {
    render(<Checkbox className='custom-class'>Label</Checkbox>)

    const root = screen.getByText('Label').closest('.checkbox')

    expect(root).toHaveClass('custom-class')
  })

  it('handle extra props to input', () => {
    render(
      <Checkbox data-testid='my-checkbox' aria-label='check'>
        Label
      </Checkbox>
    )

    const input = screen.getByTestId('my-checkbox')

    expect(input).toHaveAttribute('type', 'checkbox')
    expect(input).toHaveAttribute('aria-label', 'check')
  })

  it('use react-hook-form and submits checked value', async () => {
    const handleSubmit = jest.fn()

    render(<FormWithCheckbox onSubmit={handleSubmit} />)

    const checkbox = screen.getByRole('checkbox')
    const submit = screen.getByRole('button', { name: /submit/i })

    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    fireEvent.click(submit)
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { acceptTerms: true },
        expect.anything()
      )
    })

    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    fireEvent.click(submit)
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { acceptTerms: false },
        expect.anything()
      )
    })
  })
})
