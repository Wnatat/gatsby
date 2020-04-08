import React from "react"
import { Row, Col, Button, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
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
      },
    }
  }

  componentWillMount() {
    this.props.dispatch(setLabels(this.props.data))
    this.props.dispatch(setDatasetsCases(this.props.data))
    this.props.dispatch(setDatasetsDeaths(this.props.data))
    this.props.dispatch(setOptions(this.defaultOptions))
  }

  componentDidUpdate() {
    this.props.dispatch(setLabels(this.props.data))
    this.props.dispatch(setDatasetsCases(this.props.data))
    this.props.dispatch(setDatasetsDeaths(this.props.data))
    this.props.dispatch(setOptions(this.defaultOptions))
  }

  render() {

    return (
      <div className="chart">
        <Row>
          <Col>
            <h3>{this.props.title}</h3>
          </Col>

          <Col className="text-right">
            <ButtonGroup size="sm">
              <Button>By Country</Button>
              <Button onClick={() => this.props.groupByContinent(this.props.data)}>By Continent</Button>
              <UncontrolledButtonDropdown size="sm">
                <DropdownToggle caret>Filter</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Europe</DropdownItem>
                  <DropdownItem disabled>Belarus</DropdownItem>
                  <DropdownItem>France</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem header>Africa</DropdownItem>
                  <DropdownItem>South Africa</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </ButtonGroup>
          </Col>
        </Row>

        {this.props.children}
      </div>
    )
  }
}