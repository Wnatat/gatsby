const fs = require('fs')
const { fromJson } = require(`./json`)
const { fromCsv } = require(`./csv`)
const { fromXlsx } = require(`./xlsx`)

const fileContents = (path) => fs.readFileSync(path, 'utf8')

const parseContents = parse => path => {
  return parse(fileContents(path))
}

const parsePath = parse => (path, sheet) => {
  return parse(path, sheet)
}

exports.parse = parseContents

exports.parseJson = parseContents(fromJson)

exports.parseCsv = parseContents(fromCsv)

exports.parseXlsx = parsePath(fromXlsx)