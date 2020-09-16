module.exports = {
  siteMetadata: {
    title: `Coronavirus tracker`,
  },

  plugins: [
    // {
    //   resolve: `gatsby-source-apiserver`,
    //   options: {
    //     typePrefix: ``,

    //     url: `https://corona.lmao.ninja/v2/historical`,
  
    //     method: "get",
  
    //     headers: {
    //       "Content-Type": "application/json"
    //     },

    //     name: `countries`,

    //     refreshId: `country`,

    //     schemaType: {
    //       country: ``,
    //       province: null,
    //       timeline: {
    //         cases: {}, 
    //         deaths: {},
    //         recovered: {},
    //       },
    //     },

    //     localSave: true,
    //     path: `${__dirname}/src/data/`,
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `data`,
    //     path: `${__dirname}/src/data/`,
    //     ignore: [`**/\.*`],
    //   },
    // },
    // {
    //   resolve: `gatsby-transformer-json-key-value-to-array`
    // },
    {
      resolve: `gatsby-plugin-sass`
    },
    {
      resolve: `gatsby-source-files-manager`,
      options: {
        countryCode: 'UK',
        files: [
          { 
            url: 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/',
            strategy: 'ecdcCasesDeaths',
            updatedAtHour: '11',
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-files-manager`,
      options: {
        countryCode: 'FR',
        files: [
          { 
            url: 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/',
            strategy: 'ecdcCasesDeaths',
            updatedAtHour: '11',
          },
          { 
            url: 'https://www.data.gouv.fr/en/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7',
            strategy: 'csvHosp',
            updatedAtHour: '18',
          },
          { 
            url: 'https://www.data.gouv.fr/fr/datasets/r/b4ea7b4b-b7d1-4885-a099-71852291ff20',
            strategy: 'csvTest',
            updatedAtHour: '18',
          },
        ],
      },
    },
  ]
}
