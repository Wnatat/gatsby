const _ = require(`lodash`)
const { santePubliqueFranceData } = require(`../../../sources/santePubliqueFrance`)
const { getTimelines, columns } = require(`../index`)

exports.santePubliqueFranceHospTimelines = () => {
  const dateAccessor = record => record.jour
  const valueAccessor = (record, column) => parseInt(record[column])
  const cols = ['hosp', 'rea', 'rad', 'dc']
  return getTimelines(santePubliqueFranceData({ 'sexe': '0' }, cols))(dateAccessor, valueAccessor, cols)
}

exports.santePubliqueFranceTestTimelines = () => {
  const dateAccessor = record => record.jour
  const valueAccessor = (record, column) => parseInt(record[column])
  const cols = { 'tests': 'nb_test', 'positives': 'nb_pos' }
  return getTimelines(santePubliqueFranceData({ 'clage_covid': '0' }, cols))(dateAccessor, valueAccessor, cols)
}

