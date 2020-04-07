import React from "react"
import { setLabels, setDatasetsCases, setDatasetsDeaths, setOptions } from '../actions/chart'
import "./datasource.scss"

export default class LmaoDatasource extends React.Component {
  constructor({ children }) {
    super()

    this.children = children

    this.defaultOptions = {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: false,
      },
      legend: {
        display: true,
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis',
        }],
      }
    }

    this.propsSet = false
  }

  componentDidMount() {
    this.props.dispatch(setLabels(this.props.data))
    this.props.dispatch(setDatasetsCases(this.props.data))
    this.props.dispatch(setDatasetsDeaths(this.props.data))
    this.props.dispatch(setOptions(this.defaultOptions))

    this.propsSet = true
  }

  render() {
    if (this.propsSet) {
      return (
        <div className="chart">{this.props.children}</div>
      )
    } else {
      return (<div></div>)
    }
  }
}