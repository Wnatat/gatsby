const _ = require(`lodash`)
const { parseCsv } = require(`../filesystem/file`)
const { columns } = require(`../domain/timelines/`)

exports.santePubliqueFranceData = (filter, cols) => file => {
  return _.chain(parseCsv(file.absolutePath).data)
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