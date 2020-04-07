import React from "react"
import Chart from "chart.js"
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

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
            <UncontrolledDropdown>
              <DropdownToggle caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
