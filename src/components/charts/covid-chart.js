import React from "react"
import Chart from "chart.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

export default class CovidChart extends React.Component {
  constructor() {
    super()
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d")
    
    Chart.defaults.global.defaultFontColor = '#fff';
    this.chart = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets
      },
      options: this.props.options
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h3>{this.props.title}</h3>
          </Col>
          <Col sm={4} className="text-right">
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <canvas
            id="chart"
            ref={this.chartRef}
          />
        </Row>
      </div>
    )
  }
}
