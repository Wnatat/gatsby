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
      resolve: `gatsby-plugin-sass`
    },
    {
      resolve: `gatsby-source-remote-file`,
      options: {
        countryCode: 'FR',
        files: [
          { 
            url: 'https://static.data.gouv.fr/resources/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/${year}${month}${day}-190020/donnees-hospitalieres-covid19-${year}-${month}-${day}-19h00.csv',
            strategy: 'csvHosp',
            updatedAtHour: '19',
          },
          { 
            url: 'https://static.data.gouv.fr/resources/donnees-relatives-aux-tests-de-depistage-de-covid-19-realises-en-laboratoire-de-ville/${year}${month}${day}-190018/donnees-tests-covid19-labo-quotidien-${year}-${month}-${day}-19h00.csv',
            strategy: 'csvTest',
            updatedAtHour: '19',
          },
        ],
      },
    },
  ]
}
