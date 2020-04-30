const _ = require(`lodash`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const today = () => new Date()

const yesterday = () => {
  const date = today()
  date.setDate(date.getDate() - 1)
  return date
}

const doubleDigit = (digit) => ('0' + digit).slice(-2)

const formatDate = (format) => (date) => format(date)

const year = (date) => date.getFullYear()

const month = (date) => doubleDigit(date.getMonth() + 1)

const day = (date) => doubleDigit(date.getDate())

const wasUpdated = (updatedAtHour) => doubleDigit(today().getHours()) >= updatedAtHour

const interpolateDateVariables = (updatedAtHour) => {
  const publicationDate = wasUpdated(updatedAtHour) ? today : yesterday

  return (url) => {
    const replacements = {
      "${year}": formatDate(year)(publicationDate()),
      "${month}": formatDate(month)(publicationDate()),
      "${day}": formatDate(day)(publicationDate()),
    }
  
    return url.replace(/\$\{\w+\}/g, (all) => replacements[all] || all)
  }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, getCache }, pluginOptions) => {
  const { createNode } = actions

  const options = {
    ...pluginOptions,
    files: _.map(pluginOptions.files, (file) => ({ ...file, url: interpolateDateVariables(file.updatedAtHour)(file.url) }))
  }

  createNode({
    ...options,
    id: createNodeId(`file-manager-${pluginOptions.countryCode}`),
    children: [],
    parent: null,
    internal: {
      contentDigest: createContentDigest(pluginOptions),
      type: 'filesManager'
    }
  })

  return
}

exports.onCreateNode = async ({ node, getNode, actions, createNodeId, getCache }, pluginOptions) => {
  const { createNode, createParentChildLink } = actions

  // Check if current plugin instance has created the node
  if (node.internal.type === 'filesManager' && node.countryCode === pluginOptions.countryCode) {
    _.forEach(pluginOptions.files, async (file) => {
      try {
        await createRemoteFileNode({
          url: interpolateDateVariables(file.updatedAtHour)(file.url),
          parentNodeId: node.id,
          getCache,
          createNode,
          createNodeId,
        })
      } catch(exception) {
        //
      }
    })
  }

  if (node.internal.type === 'File' && node.parent !== null) {
    const parent = getNode(node.parent)
    createParentChildLink({ parent: parent, child: node })
  }
}