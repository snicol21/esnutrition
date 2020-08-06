const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const collectionTemplate = path.resolve("src/templates/collection-template.js")
  const productTemplate = path.resolve("src/templates/product-template.js")

  const query = await graphql(`
    {
      allShopifyCollection(filter: { handle: { ne: "frontpage" } }) {
        edges {
          node {
            handle
            title
            products {
              tags
              handle
              title
            }
          }
        }
      }
    }
  `)

  if (query.errors) {
    reporter.panicOnBuild("Error on createPages")
  }

  query.data.allShopifyCollection.edges.forEach(({ node }, index) => {
    // page for each of the base collections
    createPage({
      path: `/collections/${node.handle}/`,
      component: collectionTemplate,
      context: {
        handle: node.handle,
        title: node.title,
      },
    })
    let tags = new Set()
    // page for each of the products
    node.products.forEach(product => {
      createPage({
        path: `/products/${product.handle}`,
        component: productTemplate,
        context: {
          handle: product.handle,
          title: product.title,
        },
      })
      product.tags.forEach(tag => tags.add(tag))
    })
    // page for each of the sub-collections (tags)
    for (let tag of tags.keys()) {
      createPage({
        path: `/collections/${node.handle}/${tag.toLowerCase()}`,
        component: collectionTemplate,
        context: {
          handle: `${node.handle}__${tag.toLowerCase()}`,
          title: tag,
        },
      })
    }
  })
}
