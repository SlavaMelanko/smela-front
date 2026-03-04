// React Compiler breaks RHF's proxy-based isDirty subscription
'use no memo'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormRoot,
  FormRow,
  SubmitButton
} from '@/components/form'
import { Link } from '@/components/links'
import { Input } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'
import { getFullName } from '@/lib/format'

import { FieldName, getDefaultValues, getValues, resolver } from './schema'

export const MembershipForm = ({ member, team, isSubmitting, onSubmit }) => {
  const { t, formatDate } = useLocale()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  useEffect(() => {
    if (member) {
      reset(getValues(member))
    }
  }, [member, reset])

  return (
    <FormRoot onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <FormRow>
          <FormField label={t('team.name.label2')} optional>
            <Link to={`/admin/teams/${team.id}`}>{team.name}</Link>
          </FormField>

          <FormField
            label={t('position.label')}
            name={FieldName.POSITION}
            error={errors[FieldName.POSITION]}
            optional
          >
            <Input {...register(FieldName.POSITION)} />
          </FormField>
        </FormRow>

        <FormRow forceColumns>
          <FormField label={t('invitedBy')} optional>
            <p className='text-base'>{getFullName(member?.inviter)}</p>
          </FormField>

          <FormField label={t('joinedAt')} optional>
            <p className='text-base'>{formatDate(member?.joinedAt)}</p>
          </FormField>
        </FormRow>

        <div className='flex justify-end'>
          <SubmitButton isLoading={isSubmitting} disabled={!isDirty}>
            {t('save')}
          </SubmitButton>
        </div>
      </FormFields>
    </FormRoot>
  )
}
