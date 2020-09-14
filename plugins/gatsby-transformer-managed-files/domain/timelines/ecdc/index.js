const _ = require(`lodash`)
const { parseJson } = require(`../../../filesystem/file`)
const { getTimelines } = require(`../index`)

const ecdcData = countryCode => path => {
  return _.filter(parseJson(path).records, { 'geoId': countryCode })
}

exports.ecdcTimelines = (countryCode) => {
  const dateAccessor = record => new Date(record.year, record.month - 1, record.day)
  const valueAccessor = (record, column) => record[column]
  const columns = ['cases', 'deaths']
  return getTimelines(ecdcData(countryCode))(dateAccessor, valueAccessor, columns)
}