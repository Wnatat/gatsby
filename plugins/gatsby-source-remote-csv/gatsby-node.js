const _ = require(`lodash`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, getCache }) => {
  const { createNode } = actions

  var date = new Date();
  var yesterday = new Date();
  yesterday.setDate(date.getDate() - 1);  
  var year = yesterday.getFullYear();
  var month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
  var day = ('0' + yesterday.getDate()).slice(-2);

  let csvNode
  try {
    csvNode = await createRemoteFileNode({
      url: `https://static.data.gouv.fr/resources/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/${year + month + day}-190018/donnees-hospitalieres-covid19-${year + '-' + month + '-' + day}-19h00.csv`,
      parentNodeId: createNodeId(`csv-fr-gov-${year + month + day}`),
      getCache,
      createNode,
      createNodeId,
    })
  } catch(exception) {
    csvNode = await createRemoteFileNode({
      url: `https://static.data.gouv.fr/resources/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/${year + month + day}-190019/donnees-hospitalieres-covid19-${year + '-' + month + '-' + day}-19h00.csv`,
      parentNodeId: createNodeId(`csv-fr-gov-${year + month + day}`),
      getCache,
      createNode,
      createNodeId,
    })
  }
  

  return
}
