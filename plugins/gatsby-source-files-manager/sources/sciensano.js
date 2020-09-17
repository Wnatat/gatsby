const _ = require(`lodash`)
const { parseXlsx } = require(`../filesystem/file`)
const { columns } = require(`../domain/timelines/`)

exports.sciensanoData = (filter, cols) => file => {
  return _.chain(parseXlsx(file.absolutePath, file.sheet)[file.sheet])
  .filter(filter)
  .groupBy('DATE')
  .map((group, date) => {
    return _.reduce(group, (acc, item) => {
      return Object.assign({}, acc, {
        'DATE': new Date(date),
        ...columns(cols, (col) => _.sumBy(group, o => parseInt(o[col])))
      })
    }, {})
  })
  .value()
}