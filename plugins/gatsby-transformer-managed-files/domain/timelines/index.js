const _ = require(`lodash`)

const columns = (cols, func) => {
  const result = {}
  _.forEach(cols, (col) => {
   result[col] = func(col)
  })
  return result
}

exports.columns = columns

exports.getTimelines = datasource => (dateAccessor, valueAccessor, cols) => managedFile => {
  return _.reduce(datasource(managedFile.absolutePath), (acc, record) => {
    return columns(cols, (column) => {
      return [
        ...(acc[column] || []),
        {
          key: dateAccessor(record),
          value: valueAccessor(record, column),
        }
      ]
    })
  }, {})
}