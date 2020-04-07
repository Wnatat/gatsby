const _ = require(`lodash`)

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  function transformObject(obj, id, type) {
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

  const { createNode, createParentChildLink } = actions

  if (node.internal.mediaType !== `application/json`) {
    return
  }

  const content = {}

  content.country = node.country
  content.province = node.province
  content.timeline = {}

  for (metric in node.timeline) {
    content.timeline[metric] = [];

    for (date in node.timeline[metric]) {
      // Turn key into timestamp
      timestamp = Date.parse(date.substring(12).replace(/\//g, ' '))

      // Convert timetamp into yyyy-mm-dd format
      parsedDate = new Date(timestamp).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'numeric', year: 'numeric'
      }).replace(/\//g, '-')

      // Add the key-value object to timeline metric
      content.timeline[metric].push({ "key": parsedDate, "value": node.timeline[metric][date] });
    }
  }
  
  transformObject(
      content,
      createNodeId(`${node.id} >>> KeyValue`),
      'KeyValue'
  )
}
exports.onCreateNode = onCreateNode