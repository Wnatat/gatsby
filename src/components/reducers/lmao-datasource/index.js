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
  return _.map(
    groupBy(data, dimension)
    , (item, key) => {
      const itemMetas = _.filter(continents, { 'country': key })[0] || []
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

export const createNormaliseReducer = (chartName = 'CASES_DEATHS') => {
  return (state = { original: [], transformed: [], filters: {} }, action) => {
    switch (action.type) {
      case `NORMALISE_DATA_${chartName}`:
        const validData = _.filter(action.data, 'country')
        const normalisedData = normaliseData(validData, 'country')
        return Object.assign({}, state, {
          original: normalisedData,
          transformed: normalisedData,
          filters: _.map(normalisedData, 'country'),
        })
      case `GROUP_${chartName}_BY_COUNTRY`:
        return Object.assign({}, state, {
          transformed: state.original,
          // filters: _.map(normalisedData, 'country'),
        })
      case `GROUP_${chartName}_BY_CONTINENT`:
        const filtered = _.filter(action.data, (item) => state.filters.indexOf(item.country) !== -1)
        const dataset = getDatasetsByContinent(filtered, 'continent');
        return Object.assign({}, state, {
          transformed: dataset,
          // filters: state.filters,
        })
      case `TOGGLE_${chartName}_FILTER`:
        const index = state.filters.indexOf(action.filter)
        const filters = state.filters
        if (index !== -1) {
          filters.splice(index, 1)
        } else {
          filters.push(action.filter)
        }

        return Object.assign({}, state, {
          transformed: _.filter(state.original, (item) => filters.indexOf(item.country) !== -1),
          filters: filters,
        })
      case `TOGGLE_${chartName}_FILTERS_GROUP`:
        const items = _.map(_.filter(state.original, { 'continent': action.group }), 'country')

        let newFilters = []
        if(_.intersection(items, state.filters).length === items.length) {
          newFilters = _.filter(state.filters, item => items.indexOf(item) === -1)
        } else {
          newFilters = _.union(state.filter, items)
        }

        return Object.assign({}, state, {
          filters: newFilters,
        })
      default:
        return state
    }
  }
}