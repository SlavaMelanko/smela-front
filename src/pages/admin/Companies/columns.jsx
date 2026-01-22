export const getAccessibleColumns = (t, formatDate) => {
  const label = key => t(`table.companies.${key}`)

  return [
    {
      accessorKey: 'id',
      header: label('id'),
      size: 60
    },
    {
      accessorKey: 'name',
      header: label('name'),
      sortingFn: 'alphanumeric',
      size: 180
    },
    {
      accessorKey: 'website',
      header: label('website'),
      size: 200
    },
    {
      accessorKey: 'createdAt',
      header: label('createdAt'),
      size: 140,
      cell: info => formatDate(info.getValue())
    },
    {
      accessorKey: 'updatedAt',
      header: label('updatedAt'),
      size: 140,
      cell: info => formatDate(info.getValue())
    }
  ]
}
