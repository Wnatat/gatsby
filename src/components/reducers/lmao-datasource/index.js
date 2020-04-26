import _ from "lodash"
import continents from "./continents"

const aggregateTimeserie = (array) => {
  return _.map(
    _.reduce(array, (accumulator, item) => {
      const agg = accumulator
      _.forEach(item, (object, date) => {
        agg[date] = (agg[date] || 0) + object.value
      })
      return agg
    }, {}), 
    (value, key) => {
      return { key: key, value: value }
    }
  )
}

const aggregateTimeseries = (groups) => {
  return _.mapValues(groups, (group) => aggregateTimeserie(group))
}

const groupTimeseries = (items, timeserie) => {
  return _.map(items, (item) => {
    // Turn object { key: date, value: value } into a collection of { date: value}
    return _.keyBy(item.timeline[timeserie], 'key')
  })
}

const groupBy = (data, dimension) => {
  return _.mapValues(
    _.groupBy(data, dimension),
    items => {
      const groups = {
        cases: groupTimeseries(items, 'cases'),
        deaths: groupTimeseries(items, 'deaths'),
        recovered: groupTimeseries(items, 'recovered'),
      }

      return aggregateTimeseries(groups)
    }
  )
}

const normaliseData = (data, dimension) => {
  const validData = _.filter(data, 'country')
  
  return _.map(
    groupBy(validData, dimension)
    , (item, key) => {
      const itemMetas = _.find(continents, { 'country': key }) || []
      const code = itemMetas.code || null
      const continent = itemMetas.continent || null
      return {
        country: key,
        code: code,
        continent: continent,
        province: null,
        timeline: item
      }
    }
  )
}

const getDatasetsByContinent = (data) => {
  return normaliseData(_.map(data, (item) => {
    return Object.assign({}, item, {
      continent: _.filter(continents, ['country', item.country])[0].continent,
    })
  }), 'continent')
}

const filterData = (data, filters) => {
  return _.filter(data, (item) => filters.indexOf(item.country) !== -1)
}

const toggleFilters = (filters, selectedFilters, toggler) => {
  return toggler() ? 
    _.without(filters, ...selectedFilters) : 
    _.union(filters, selectedFilters)
}

const getTransformedData = (data, filters, groupBy) => {
  return groupBy === 'country' ?
    filterData(data, filters) :
    getDatasetsByContinent(filterData(data, filters))
}

const sortByDimension = (data, dimension) => {
  return _.orderBy(data, (item) => {
    return _.reduce(item.timeline[dimension], (sum, n) => {
      return { value: sum.value + n.value }
    }, { value: 0 }).value
  }, 'desc')
}

const topN = (data, dimension = 'cases', n = 5)  => _.slice(sortByDimension(data, dimension), 0, n)

export const createNormaliseReducer = (chartName = 'CASES_DEATHS') => {
  return (state = { original: [], transformed: [], filters: [], groupBy: 'country' }, action) => {
    switch (action.type) {
      case `NORMALISE_DATA_${chartName}`:
        const normalisedData = topN(normaliseData(action.data, 'country'))
        return Object.assign({}, state, {
          original: normalisedData,
          transformed: normalisedData,
          filters: _.map(normalisedData, 'country'),
          groupBy: 'country',
        })
      case `GROUP_${chartName}_BY_COUNTRY`:
        return Object.assign({}, state, {
          transformed: filterData(state.original, state.filters),
          groupBy: 'country',
        })
      case `GROUP_${chartName}_BY_CONTINENT`:
        return Object.assign({}, state, {
          transformed: getDatasetsByContinent(filterData(action.data, state.filters)),
          groupBy: 'continent',
        })
      case `TOGGLE_${chartName}_FILTER`:
        const activeFilters = toggleFilters(state.filters, [action.filter], () => {
          return state.filters.indexOf(action.filter) !== -1
        })
        
        return Object.assign({}, state, {
          transformed: getTransformedData(state.original, activeFilters, state.groupBy),
          filters: activeFilters,
        })
      case `TOGGLE_${chartName}_FILTERS_GROUP`:
        const filterable = _.map(_.filter(state.original, { 'continent': action.group }), 'country')

        const selectedFilters = _.filter(state.filters, (filter) => {
          return _.find(continents, { country: filter }).continent === action.group
        })

        const activeGroupFilters = toggleFilters(state.filters, filterable, () => {
          return _.intersection(filterable, selectedFilters).length === filterable.length
        })

        return Object.assign({}, state, {
          transformed: getTransformedData(state.original, activeGroupFilters, state.groupBy),
          filters: activeGroupFilters,
        })
      case `TOP_${chartName}`:
        const top = topN(action.data, action.dimension, action.number)

        const topFilters = _.map(top, 'country')

        return Object.assign({}, state, {
          transformed: getTransformedData(top, topFilters, state.groupBy),
          filters: topFilters,
        })
      default:
        return state
    }
  }
}