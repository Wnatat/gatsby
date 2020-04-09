import { graphql } from 'gatsby'
import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { normalise } from '../components/actions'
import rootReducer from '../components/reducers'
import Layout from "../components/layout"
import LmaoDatasource from "../components/containers/lmao-datasource"
import CasesDeathByCountry from "../components/containers/cases-deaths-by-country"
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
          title: "New Cases And Deaths By Country",
          filters: {
            geo: {
              continent: null,
              country: null,
              province: null,
            },
          },
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
      }
    })

    this.store.dispatch(normalise(data.allKeyValue.nodes))
  }

  render() {
    return (
      <Layout>
          <Provider store={this.store}>
            <Row>
              <Col md={8}>
                <LmaoDatasource>
                  <CasesDeathByCountry />
                </LmaoDatasource>
              </Col>
              <Col></Col>
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