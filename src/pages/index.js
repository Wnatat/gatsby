import { graphql } from 'gatsby'
import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { normaliseCasesDeaths, normaliseDailyInfections } from '../components/actions'
import rootReducer from '../components/reducers'
import Layout from "../components/layout"
import CasesDeathsLmaoDatasource from "../components/containers/cases-deaths-lmao-datasource"
import CasesDeathByCountry from "../components/containers/cases-deaths"
import DailyInfectionsLmaoDatasource from "../components/containers/daily-infections-lmao-datasource"
import DailyInfections from "../components/containers/daily-infections"
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
        // casesSince: {
        //   data: {
        //     original: [],
        //     transformed: [],
        //   },
        //   title: "",
        //   labels: [],
        //   datasets: [],
        //   options: [],
        // },
      }
    })

    this.store.dispatch(normaliseCasesDeaths(data.allKeyValue.nodes))
    this.store.dispatch(normaliseDailyInfections(data.allKeyValue.nodes))
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

export const query = graphql`
  query {
    allKeyValue(filter: {country: {in: ["Italy", "France", "UK", "Germany", "USA"]}}) {
      nodes {
        id
        country
        province
        timeline {
          cases {
            key
            value
          }
          deaths {
            key
            value
          }
          recovered {
            key
            value
          }
        }
      }
    }
  }
`