const { ecdcTimelines } = require(`../domain/Timelines/ecdc`)
const { santePubliqueFranceHospTimelines, santePubliqueFranceTestTimelines } = require(`../domain/Timelines/santePubliqueFrance`)
const { sciensanoCasesTimelines } = require(`../domain/Timelines/sciensano`)

exports.strategies = {
  ecdcCasesDeaths: ecdcTimelines,
  csvHosp: santePubliqueFranceHospTimelines,
  csvTest: santePubliqueFranceTestTimelines,
  xlsxCases: sciensanoCasesTimelines,
}
