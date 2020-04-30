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

const interpolateDateVariables = (url, updatedAtHour) => {
  const publicationDate = wasUpdated(updatedAtHour) ? today : yesterday

  const replacements = {
    "${year}": formatDate(year)(publicationDate()),
    "${month}": formatDate(month)(publicationDate()),
    "${day}": formatDate(day)(publicationDate()),
  }

  return url.replace(/\$\{\w+\}/g, (all) => replacements[all] || all)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, getCache }, pluginOptions) => {
  const { createNode } = actions

  const object = { countryCode: pluginOptions.countryCode }

  createNode({
    ...pluginOptions,
    id: createNodeId(`file-manager-${pluginOptions.countryCode}`),
    children: [],
    parent: null,
    internal: {
      contentDigest: createContentDigest(object),
      type: 'filesManager'
    }
  })

  return
}

exports.onCreateNode = async ({ node, getNode, actions, createNodeId, getCache }, pluginOptions) => {
  const { createNode, createParentChildLink } = actions

  if (node.internal.type === 'filesManager') {
    _.forEach(pluginOptions.files, async (file) => {
      try {
        await createRemoteFileNode({
          url: interpolateDateVariables(file.url, file.updatedAtHour),
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