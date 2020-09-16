const Papa = require('papaparse')

exports.fromCsv = (contents) => {
  return Papa.parse(contents, {
    header: true,
    skipEmptyLines: true,
    // dynamicTyping: true,
  })
}
