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

export const toggleCasesDeathsFilter = (filter) => ({
  type: 'TOGGLE_CASES_DEATHS_FILTER',
  filter
})

export const toggleDailyInfectionsFilter = (filter) => ({
  type: 'TOGGLE_DAILY_INFECTIONS_FILTER',
  filter
})

export const toggleCasesDeathsFiltersGroup = (group) => ({
  type: 'TOGGLE_CASES_DEATHS_FILTERS_GROUP',
  group
})

export const toggleDailyInfectionsFiltersGroup = (group) => ({
  type: 'TOGGLE_DAILY_INFECTIONS_FILTERS_GROUP',
  group
})

export const topCasesDeaths = (data, number, dimension) => ({
  type: 'TOP_CASES_DEATHS',
  data,
  number,
  dimension
})

export const topDailyInfections = (data, number, dimension) => ({
  type: 'TOP_DAILY_INFECTIONS',
  data,
  number,
  dimension
})