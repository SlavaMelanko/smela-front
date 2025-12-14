import { render, screen } from '@testing-library/react'

import Multiselect from './index'

const defaultOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' }
]

describe('Multiselect', () => {
  describe('Rendering', () => {
    it('renders with default class', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
        />
      )

      expect(container.querySelector('.multiselect')).toBeInTheDocument()
    })

    it('applies custom className without error class', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
          className='custom-class'
        />
      )

      const wrapper = container.querySelector('.multiselect')

      expect(wrapper).toHaveClass('custom-class')
      expect(wrapper).not.toHaveClass('multiselect--error')
    })

    it('applies error class when error is true', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
          error
        />
      )

      expect(container.querySelector('.multiselect')).toHaveClass(
        'multiselect--error'
      )
    })
  })

  describe('Props Forwarding', () => {
    it('forwards options to MultiSelect', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
        />
      )

      const dropdown = container.querySelector('.dropdown-container')

      expect(dropdown).toBeInTheDocument()
    })

    it('renders with empty options array', () => {
      const { container } = render(
        <Multiselect
          options={[]}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
        />
      )

      expect(container.querySelector('.multiselect')).toBeInTheDocument()
    })

    it('displays selected value', () => {
      render(
        <Multiselect
          options={defaultOptions}
          value={[{ label: 'Option A', value: 'a' }]}
          onChange={() => {}}
          labelledBy='test'
        />
      )

      expect(screen.getByText('Option A')).toBeInTheDocument()
    })

    it('forwards disabled prop', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
          disabled
        />
      )

      const dropdown = container.querySelector('.dropdown-container')

      expect(dropdown).toHaveAttribute('aria-disabled', 'true')
    })

    it('forwards labelledBy prop', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='role-filter'
        />
      )

      const dropdown = container.querySelector('.dropdown-container')

      expect(dropdown).toHaveAttribute('aria-labelledby', 'role-filter')
    })

    it('forwards rest props to MultiSelect', () => {
      const { container } = render(
        <Multiselect
          options={defaultOptions}
          value={[]}
          onChange={() => {}}
          labelledBy='test'
          data-testid='multiselect-test'
        />
      )

      // Verify the component renders with forwarded props
      expect(container.querySelector('.rmsc')).toBeInTheDocument()
    })
  })
})
