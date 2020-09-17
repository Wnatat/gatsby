import React from "react"
import Chart from "chart.js"
import { Row } from "reactstrap"

export default class CovidChart extends React.Component {
  constructor() {
    super()
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d")
    
    Chart.defaults.global.defaultFontColor = '#fff';
    this.chart = new Chart(myChartRef, {
      type: this.props.type,
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets
      },
      options: this.props.options
    });
  }

  shouldComponentUpdate(nextProps) {
    this.chart.config.data.labels = nextProps.labels
    this.chart.config.data.datasets = nextProps.datasets
    this.chart.update()

    return true
  }

  render() {
    return (
      <Row className="h-100">
        <canvas
          id="chart"
          ref={this.chartRef} />
      </Row>
    )
  }
}
