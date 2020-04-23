import React from "react"
import _ from "lodash"
import Flag from "react-world-flags"
import ContinentIcon from "../icons/icon"
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
    const dropdownMenu = []

    _.forEach(
      _.groupBy(this.props.data.original, 'continent'),
      (group, continent) => {
        dropdownMenu.push(<DropdownItem header key={continent} >
          <Label check>
            <Input type="checkbox" defaultChecked={_.intersection(_.map(group, 'country'), this.props.data.filters).length === group.length} onChange={() => this.props.toggleFiltersGroup(continent)} />{' '}
            <ContinentIcon continent={continent} width="16" height="16" />{' '}
            {continent}
          </Label>
        </DropdownItem>)

        _.forEach(group, item => {
          dropdownMenu.push(<div className="dropdown-item" key={item.country} >
            <Label check>
              <Input type="checkbox" defaultChecked={this.props.data.filters.indexOf(item.country) !== -1} onChange={() => this.props.toggleFilter(item.country)} />{' '}
              <Flag code={item.code} height="16" width="16"/>{' '}
              {item.country}
            </Label>
          </div>)
      })
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