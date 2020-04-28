/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Coronavirus tracker`,
  },

  plugins: [
    {
      resolve: `gatsby-source-apiserver`,
      options: {
        typePrefix: ``,

        url: `https://corona.lmao.ninja/v2/historical`,
  
        method: "get",
  
        headers: {
          "Content-Type": "application/json"
        },

        name: `countries`,

        refreshId: `country`,

        schemaType: {
          country: ``,
          province: null,
          timeline: {
            cases: {}, 
            deaths: {},
            recovered: {},
          },
        },

        localSave: true,
        path: `${__dirname}/src/data/`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-transformer-json-key-value-to-array`
    },
    {
      resolve: `gatsby-source-remote-csv`
    },
    {
      resolve: `gatsby-transformer-csv-to-object`
    },
    {
      resolve: `gatsby-plugin-sass`
    }
  ]
}
