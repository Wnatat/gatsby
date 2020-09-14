const _ = require(`lodash`)
const { parseCsv } = require(`../../../filesystem/file`)
const { getTimelines, columns } = require(`../index`)

const santePubliqueFranceData = (filter, cols) => path => {
  return _.chain(parseCsv(path).data)
  .filter(filter)
  .groupBy('jour')
  .map((record, date) => {
    return {
      date: new Date(date),
      ...columns(cols, (col) => _.sumBy(record, o => parseInt(o[col])))
    }
  })
  .value()
}

exports.santePubliqueFranceHospTimelines = () => {
  const dateAccessor = record => record['date']
  const valueAccessor = (record, column) => parseInt(record[column])
  const columns = ['hosp', 'rea', 'rad']
  return getTimelines(santePubliqueFranceData({ 'sexe': '0' }, columns))(dateAccessor, valueAccessor, columns)
}

exports.santePubliqueFranceTestTimelines = () => {
  const dateAccessor = record => record['date']
  const valueAccessor = (record, column) => parseInt(record[column])
  const columns = ['nb_test', 'nb_pos']
  return getTimelines(santePubliqueFranceData({ 'clage_covid': '0' }, columns))(dateAccessor, valueAccessor, columns)
}

