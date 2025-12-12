const RowsPerPage = Object.freeze({
  SM: 25,
  MD: 50,
  LG: 100
})

export const isValidLimit = value => {
  const validLimits = Object.values(RowsPerPage)

  return Number.isInteger(value) && validLimits.includes(value)
}

export default RowsPerPage
