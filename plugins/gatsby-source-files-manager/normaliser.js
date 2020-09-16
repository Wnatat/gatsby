const _ = require(`lodash`)
const { Timelines } = require(`./domain/Timelines`)
const { ManagedFiles } = require(`./domain/ManagedFiles`)
const { ecdcTimelines } = require(`./domain/Timelines/ecdc`)
const { santePubliqueFranceHospTimelines, santePubliqueFranceTestTimelines } = require(`./domain/Timelines/santePubliqueFrance`)

const getManagedFiles = (item) => _.map(item.files, file => { 
  return {
    ..._.filter(item.childrenFile, childFile => childFile.url === file.url)[0],
    strategy: file.strategy,
  }
})

const strategies = {
  ecdcCasesDeaths: ecdcTimelines,
  csvHosp: santePubliqueFranceHospTimelines,
  csvTest: santePubliqueFranceTestTimelines
}

const extractTimelines = countryCode => files => {
  return _.map(files, file => {
    return Timelines.of(file).map(strategies[file.strategy](countryCode))
  })
}

const formatTimelines = countryCode => countries => {
  return _.reduce(countries, (acc, country) => {
    return {
      countryCode: countryCode,
      ...acc,
      ...country.emit()
    }
  }, {})
}

exports.normalise = (options) => {
  return _.map(options, (option) => {
    return ManagedFiles.of(getManagedFiles(option))
    .map(extractTimelines(option.countryCode))
    .chain(formatTimelines(option.countryCode))
  })
}
