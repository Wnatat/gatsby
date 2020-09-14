const fs = require('fs')
const Papa = require('papaparse')
const _ = require('lodash')

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions

  if (node.internal.mediaType !== 'text/csv') {
    return
  }
  
  function createTransformedNode(obj, id, type) {
    const jsonNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(jsonNode)
    createParentChildLink({ parent: node, child: jsonNode })
  }

  const contents = fs.readFileSync(node.absolutePath, 'utf8')

  const csv = Papa.parse(contents, {
    header: true,
    skipEmptyLines: true,
  })

  const data = _.chain(csv.data)
    .filter({ sexe: '0' })
    .filter((o) => o.dep !== '')
    .groupBy('dep')
    .map((group, province) => {
      return _.reduce(group, (accumulator, item) => {
        return Object.assign(accumulator, {
          province: province,
          timeline: {
            cases: [
              ...accumulator.timeline.cases,
              { key: item.jour, value: item.hosp },
            ],
            reanimations: [
              ...accumulator.timeline.reanimations,
              { key: item.jour, value: item.rea },
            ],
            deaths: [
              ...accumulator.timeline.deaths,
              { key: item.jour, value: item.dc },
            ],
            recovered: [
              ...accumulator.timeline.recovered,
              { key: item.jour, value: item.rad },
            ],
          },
        })
      }, {
        country: 'France',
        province: null,
        timeline: {
          cases: [],
          reanimations: [],
          deaths: [],
          recovered: [],
        },
      })
    })
    .each((item) => {
      createTransformedNode(item, createNodeId(`fr-gov-${item.province}`), 'FrGov')
    })
    .value()
}
