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
  return _.mapValues(groups, (group) => {
    return aggregateTimeserie(group)
  })
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
      return {
        country: key,
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

const normalise = (state = { original: [], transformed: [] }, action) => {
  switch (action.type) {
    case 'NORMALISE_DATA_CASES_DEATHS':
      let validData = _.filter(action.data, 'country')
      return Object.assign({}, state, {
        original: normaliseData(validData, 'country'),
      })
    case 'NORMALISE_DATA_DAILY_INFECTIONS':
      validData = _.filter(action.data, 'country')
      return Object.assign({}, state, {
        original: normaliseData(validData, 'country'),
      })
    case 'GROUP_CASES_DEATHS_BY_COUNTRY':
      return Object.assign({}, state, {
        transformed: state.original,
      })
    case 'GROUP_CASES_DEATHS_BY_CONTINENT':
      return Object.assign({}, state, {
        transformed: getDatasetsByContinent(action.data, 'continent'),
      })
    case 'GROUP_DAILY_INFECTIONS_BY_COUNTRY':
      return Object.assign({}, state, {
        transformed: state.original,
      }) 
    case 'GROUP_DAILY_INFECTIONS_BY_CONTINENT':
      return Object.assign({}, state, {
        transformed: getDatasetsByContinent(action.data, 'continent'),
      })
    default:
      return state
  }
}

export default normalise