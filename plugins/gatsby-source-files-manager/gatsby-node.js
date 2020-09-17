const _ = require(`lodash`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { normalise } = require(`./normaliser`)

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, getCache }, pluginOptions, cb) => {
  const { createNode } = actions

  const options = {
    ...pluginOptions,
  }

  const remoteFiles = _.map(options.files, (file) => {
    return createRemoteFileNode({
      url: file.url,
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

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  if (node.internal.type === 'filesManager') {
    node.childrenFile = []

    _.forEach(node.children, (childFileId) => {
      file = getNode(childFileId)
      node.childrenFile.push({
        url: file.url,
        absolutePath: file.absolutePath,
        id: file.id,
      })
    })

    const datasets = normalise([node])
    console.log(datasets)

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
      
      const node = Object.assign({}, dataset, nodeMeta)
      createNode(node)
    })
  }
}