export const normalise = (data) => ({
  type: 'NORMALISE_DATA',
  data
})

export const groupByCountry = (data) => ({
  type: 'GROUP_BY_COUNTRY',
  data
})

export const groupByContinent = () => ({
  type: 'GROUP_BY_CONTINENT',
})
