const _ = require(`lodash`)

const columns = (cols, func) => {
  const result = {}
  _.forEach(cols, (col, alias) => {
    result[col] = func(col)
  })
  return result
}

exports.columns = columns

exports.getTimelines = datasource => (dateAccessor, valueAccessor, cols) => managedFile => {
  return _.reduce(datasource(managedFile), (acc, record) => {
    return columns(cols, (col) => {
      return [
        ...(acc[col] || []),
        {
          key: dateAccessor(record),
          value: valueAccessor(record, col),
        }
      ]
    })
  }, {})
}