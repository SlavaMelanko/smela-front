import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Multiselect from './index'

const useMultiselectStrings = () => {
  const { t } = useTranslation()

  return {
    allItemsAreSelected: t('multiselect.allItemsAreSelected'),
    clearSearch: t('multiselect.clearSearch'),
    clearSelected: t('multiselect.clearSelected'),
    noOptions: t('multiselect.noOptions'),
    search: t('multiselect.search'),
    selectAll: t('multiselect.selectAll'),
    selectAllFiltered: t('multiselect.selectAllFiltered'),
    selectSomeItems: t('multiselect.selectSomeItems'),
    create: t('multiselect.create')
  }
}

export default {
  title: 'Multiselect',
  component: Multiselect,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the multiselect'
    },
    error: {
      control: 'boolean',
      description: 'Show error state'
    },
    hasSelectAll: {
      control: 'boolean',
      description: 'Show select all option'
    },
    disableSearch: {
      control: 'boolean',
      description: 'Disable search input'
    }
  },
  args: {
    disabled: false,
    error: false,
    hasSelectAll: true,
    disableSearch: false
  }
}

const RolesTemplate = args => {
  const { t } = useTranslation()
  const overrideStrings = useMultiselectStrings()
  const [selected, setSelected] = useState([])

  const options = [
    { label: t('role.values.admin'), value: 'admin' },
    { label: t('role.values.user'), value: 'user' },
    { label: t('role.values.guest'), value: 'guest' },
    { label: t('role.values.enterprise'), value: 'enterprise' },
    { label: t('role.values.owner'), value: 'owner' }
  ]

  return (
    <div style={{ width: 300 }}>
      <Multiselect
        {...args}
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={t('role.name')}
        overrideStrings={overrideStrings}
      />
    </div>
  )
}

export const Roles = {
  render: RolesTemplate,
  args: {}
}

const StatusesTemplate = args => {
  const { t } = useTranslation()
  const overrideStrings = useMultiselectStrings()
  const [selected, setSelected] = useState([])

  const options = [
    { label: t('status.values.active'), value: 'active' },
    { label: t('status.values.pending'), value: 'pending' },
    { label: t('status.values.suspended'), value: 'suspended' },
    { label: t('status.values.archived'), value: 'archived' },
    { label: t('status.values.trial'), value: 'trial' }
  ]

  return (
    <div style={{ width: 300 }}>
      <Multiselect
        {...args}
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={t('status.name')}
        overrideStrings={overrideStrings}
      />
    </div>
  )
}

export const Statuses = {
  render: StatusesTemplate,
  args: {}
}
