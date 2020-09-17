import { graphql } from 'gatsby'
import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { normaliseCasesDeaths, normaliseDailyInfections } from '../store/actions'
import rootReducer from '../store/reducers'
import Layout from "../components/layout"
import CasesDeathsLmaoDatasource from "../store/containers/cases-deaths-lmao-datasource"
import CasesDeathByCountry from "../store/containers/cases-deaths"
import DailyInfectionsLmaoDatasource from "../store/containers/daily-infections-lmao-datasource"
import DailyInfections from "../store/containers/daily-infections"
import { Row, Col } from "reactstrap"

export default class Index extends React.Component {
  constructor({ data }) {
    super()
    
    this.store = createStore(rootReducer, {
      graphs: {
        cases: {
          data: {
            original: [],
            transformed: [],
            filters: [],
            groupBy: null,
          },
          title: "New Cases And Deaths",
          type: "line",
          labels: [],
          datasets: [],
          options: {
            layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
            },
            scales: {
              yAxes: [
                {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-cases',
                  gridLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, .4)',
                    drawOnChartArea: true,
                  },
                  ticks: {
                    callback: value => {
                        return value.toLocaleString('en-GB');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'cases'
                  },
                },
                {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  id: 'y-axis-deaths',
                  ticks: {
                    callback: value => {
                        return value.toLocaleString('en-GB');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'deaths'
                  },
                }
              ],
            }
          },
        },
        dailyInfections: {
          data: {
            original: [],
            transformed: [],
            filters: [],
            groupBy: null,
          },
          title: "Daily infections",
          type: "bar",
          labels: [],
          datasets: [],
          options: {
            aspectRatio: 1,
            layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
            },
            scales: {
              yAxes: [
                {
                  type: 'linear',
                  display: true,
                  id: 'y-axis-cases',
                  gridLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, .4)',
                    drawOnChartArea: true,
                  },
                  ticks: {
                    callback: value => {
                        return value.toLocaleString('en-GB');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'cases'
                  },
                },
              ],
            }
          },
        },
      }
    })

    this.store.dispatch(normaliseCasesDeaths(data.allKeyValue.nodes))
    this.store.dispatch(normaliseDailyInfections(data.allKeyValue.nodes))

    // this.store.dispatch(normaliseCasesDeaths(data.allFrGov.nodes))
    // this.store.dispatch(normaliseDailyInfections(data.allFrGov.nodes))
  }

  render() {
    return (
      <Layout>
          <Provider store={this.store}>
            <Row className="no-gutters h-100">
              <Col md={8}>
                <CasesDeathsLmaoDatasource>
                  <CasesDeathByCountry />
                </CasesDeathsLmaoDatasource>
              </Col>
              <Col>
                <DailyInfectionsLmaoDatasource>
                  <DailyInfections />
                </DailyInfectionsLmaoDatasource>
              </Col>
            </Row>
          </Provider>
      </Layout>
    )
  }
}

// export const query = graphql`
//   query {
//     allKeyValue(filter: {country: {in: ["Italy", "France", "UK", "Germany", "USA", "Spain"]}}) {
//       nodes {
//         id
//         country
//         province
//         timeline {
//           cases {
//             key
//             value
//           }
//           deaths {
//             key
//             value
//           }
//           recovered {
//             key
//             value
//           }
//         }
//       }
//     }
//   }
// `

// export const query = graphql`
//   query MyQuery {
//     allFrGov(filter: {province: {eq: "59"}}) {
//       nodes {
//         country
//         province
//         timeline {
//           cases {
//             key
//             value
//           }
//           deaths {
//             key
//             value
//           }
//           reanimations {
//             key
//             value
//           }
//           recovered {
//             key
//             value
//           }
//         }
//       }
//     }
//   }
// `