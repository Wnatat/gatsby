const _ = require(`lodash`)
const { parseJson } = require(`../filesystem/file`)

exports.ecdcData = countryCode => file => {
  return _.filter(parseJson(file.absolutePath).records, { 'geoId': countryCode })
}