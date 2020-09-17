const _ = require(`lodash`)
const { sciensanoData } = require(`../../../sources/sciensano`)
const { getTimelines, columns } = require(`../index`)

const dateAccessor = record => record['DATE']
const valueAccessor = (record, column) => parseInt(record[column])

exports.sciensanoCasesTimelines = () => {
  const cols = ['CASES']
  return getTimelines(sciensanoData(o => !_.isUndefined(o.PROVINCE) && !_.isUndefined(o.DATE), cols))(dateAccessor, valueAccessor, cols)
}

exports.sciensanoHospTimelines = () => {
  const cols = ['TOTAL_IN']
  return getTimelines(sciensanoData({}, cols))(dateAccessor, valueAccessor, columns)
}

exports.sciensanoDeathTimelines = () => {
  const cols = ['DEATHS']
  return getTimelines(sciensanoData({}, cols))(dateAccessor, valueAccessor, columns)
}

exports.sciensanoTestTimelines = () => {
  const cols = ['TESTS_ALL']
  return getTimelines(sciensanoData({}, cols))(dateAccessor, valueAccessor, columns)
}

