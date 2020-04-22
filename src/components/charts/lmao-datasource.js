import React from "react"
import _ from "lodash"
import { Row, Col, Button, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input } from "reactstrap"
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

  render() {
    const dropdownMenu = _.map(this.props.data.original, (item) => {
      return <div className="dropdown-item" key={item.country} >
        <Label check>
          <Input type="checkbox" defaultChecked={this.props.data.filters.indexOf(item.country) !== -1} onChange={() => this.props.setFilters(item.country)} />{' '}
          {item.country}
        </Label>
      </div>
    })

    return (
      <div className="chart">
        <Row>
          <Col>
            <h3>{this.props.title}</h3>
          </Col>

          <Col className="text-right">
            <ButtonGroup size="sm">
              <Button onClick={() => this.props.groupByCountry(this.props.data.original)}>Country</Button>
              <Button onClick={() => this.props.groupByContinent(this.props.data.original)}>Continent</Button>
              <UncontrolledButtonDropdown size="sm">
                <DropdownToggle caret>Filters</DropdownToggle>
                <DropdownMenu right>
                  {dropdownMenu}
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