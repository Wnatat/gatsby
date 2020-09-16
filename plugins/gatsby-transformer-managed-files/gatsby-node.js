const _ = require(`lodash`)
const { normalise } = require(`./normaliser`)

exports.createPages = async ({ graphql, actions, createNodeId, createContentDigest }, pluginOptions) => {
  const { createNode } = actions

  const result = await graphql(`
  query AllFilesManagers {
    allFilesManager {
      nodes {
        id
        countryCode
        files {
          strategy
          updatedAtHour
          url
        }
        childrenFile {
          url
          absolutePath
          id
        }
      }
    }
  }`
  ).then((results) => {
    const datasets = normalise(results.data.allFilesManager.nodes)

    _.forEach(datasets, dataset => {
      const nodeMeta = {
        id: createNodeId(`dataset-${dataset.countryCode}`),
        children: [],
        parent: null,
        internal: {
          type: 'datasets',
          contentDigest: createContentDigest(JSON.stringify(dataset))
        },
      }
      
      const node = Object.assign({}, { 'countryCode': dataset.countryCode }, nodeMeta)
      createNode(node)
    })
  })
}
