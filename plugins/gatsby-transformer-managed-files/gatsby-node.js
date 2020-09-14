const _ = require(`lodash`)
const { normalise } = require(`./normaliser`)

exports.createPages = async ({ graphql, actions }, pluginOptions) => {
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
  ).then((results) => normalise(results.data.allFilesManager.nodes))
  // ).then((results) => console.log(JSON.stringify(results, null, 4)))
  return
}
