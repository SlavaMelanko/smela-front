export const FieldName = {
  NAME: 'name',
  WEBSITE: 'website',
  DESCRIPTION: 'description'
}

export const getDefaultValues = () => ({
  [FieldName.NAME]: '',
  [FieldName.WEBSITE]: '',
  [FieldName.DESCRIPTION]: ''
})
