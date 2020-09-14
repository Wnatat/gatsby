const fs = require('fs')
const { fromJson } = require(`./json`)
const { fromCsv } = require(`./csv`)

const fileContents = (path) => fs.readFileSync(path, 'utf8')

const parse = (parse) => (path) => {
  return parse(fileContents(path))
}

exports.parse = parse

exports.parseJson = parse(fromJson)

exports.parseCsv = parse(fromCsv)