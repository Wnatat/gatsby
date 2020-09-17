const _ = require(`lodash`)
const { parseCsv } = require(`../../../filesystem/file`)
const { getTimelines, columns } = require(`../index`)

const santePubliqueFranceData = (filter, cols) => path => {
  return _.chain(parseCsv(path).data)
  .filter(filter)
  .groupBy('jour')
  .map((group, date) => {
    return _.reduce(group, (acc, item) => {
      return Object.assign({}, acc, {
        'jour': new Date(date),
        ...columns(cols, (col) => _.sumBy(group, o => parseInt(o[col])))
      })
    }, {})
  })
  .value()
}

exports.santePubliqueFranceHospTimelines = () => {
  const dateAccessor = record => record.jour
  const valueAccessor = (record, column) => parseInt(record[column])
  const columns = ['hosp', 'rea', 'rad', 'dc']
  return getTimelines(santePubliqueFranceData({ 'sexe': '0' }, columns))(dateAccessor, valueAccessor, columns)
}

exports.santePubliqueFranceTestTimelines = () => {
  const dateAccessor = record => record.jour
  const valueAccessor = (record, column) => parseInt(record[column])
  const columns = { 'tests': 'nb_test', 'positives': 'nb_pos' }
  return getTimelines(santePubliqueFranceData({ 'clage_covid': '0' }, columns))(dateAccessor, valueAccessor, columns)
}

