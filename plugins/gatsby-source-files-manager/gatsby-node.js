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

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, getCache }, pluginOptions, cb) => {
  const { createNode } = actions

  const options = {
    ...pluginOptions,
    files: _.map(pluginOptions.files, (file) => {
      return {
        ...file,
        url: interpolateDateVariables(file.updatedAtHour)(file.url),
      }
    })
  }

  const remoteFiles = _.map(options.files, (file) => {
    return createRemoteFileNode({
      url: interpolateDateVariables(file.updatedAtHour)(file.url),
      parentNodeId: null,
      getCache,
      createNode,
      createNodeId,
    })
  })

  // creating remoteFileNodes asynchronously to retrieve their ID and attribute them as children to FilesManager
  Promise.all(remoteFiles).then((downloadedRemoteFile) => {
    createNode({
      ...options,
      id: createNodeId(`file-manager-${options.countryCode}`),
      children: _.map(downloadedRemoteFile, 'id'),
      parent: null,
      internal: {
        contentDigest: createContentDigest(options),
        type: 'filesManager'
      }
    })
  }).catch((errors) => {
    console.error(errors)
  })
  .finally(() => {
    cb()
  })
}
