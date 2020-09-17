const excelToJson = require('convert-excel-to-json');

exports.fromXlsx = (path, sheet) => {
  return excelToJson({
    sourceFile: path,
    header: {
        rows: 1
    },
    columnToKey: {
      '*': '{{columnHeader}}'
    },
    sheets: [sheet]
  })
}
