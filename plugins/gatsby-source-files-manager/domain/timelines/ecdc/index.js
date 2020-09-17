const _ = require(`lodash`)
const { ecdcData } = require(`../../../sources/ecdc`)
const { getTimelines } = require(`../index`)

exports.ecdcTimelines = (countryCode) => {
  const dateAccessor = record => new Date(record.year, record.month - 1, record.day)
  const valueAccessor = (record, column) => record[column]
  const columns = ['cases', 'deaths']
  return getTimelines(ecdcData(countryCode))(dateAccessor, valueAccessor, columns)
}