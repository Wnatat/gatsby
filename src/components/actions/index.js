// export const normalise = (data) => ({
//   type: 'NORMALISE_DATA',
//   data
// })

export const normaliseCasesDeaths = (data) => ({
  type: 'NORMALISE_DATA_CASES_DEATHS',
  data
})

export const normaliseDailyInfections = (data) => ({
  type: 'NORMALISE_DATA_DAILY_INFECTIONS',
  data
})

export const groupCasesDeathsByCountry = (data) => ({
  type: 'GROUP_CASES_DEATHS_BY_COUNTRY',
  data
})

export const groupCasesDeathsByContinent = (data) => ({
  type: 'GROUP_CASES_DEATHS_BY_CONTINENT',
  data
})

export const groupDailyInfectionsByCountry = (data) => ({
  type: 'GROUP_DAILY_INFECTIONS_BY_COUNTRY',
  data
})

export const groupDailyInfectionsByContinent = (data) => ({
  type: 'GROUP_DAILY_INFECTIONS_BY_CONTINENT',
  data
})