import _ from "lodash"
import continents from "./continents"

const aggregateTimeserie = (array) => {
  // Formats a key-value collection into an array of { key: date, value: value}
  return _.map(
    // This reduces multiple array of dates and values into one array of dates with sum of values from other arrays.
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
  return _.mapValues(groups, (group, key) => {
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
    // Group data array by country
    _.groupBy(data, dimension),
    items => {
      // For each grouped country array
      const groups = {
        cases: groupTimeseries(items, 'cases'),
        deaths: groupTimeseries(items, 'deaths'),
        recovered: groupTimeseries(items, 'recovered'),
      }

      // Aggregate all reduntant arrays for one country into one.
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

const normalise = (state = [], action) => {
  switch (action.type) {
    case 'NORMALISE_DATA':
      const validData = _.filter(action.data, 'country')
      return normaliseData(validData, 'country')
    case 'GROUP_BY_CONTINENT':
      return getDatasetsByContinent(action.data, 'continent')
    default:
      return state
  }
}

export default normalise