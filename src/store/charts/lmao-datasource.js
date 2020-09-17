import React from "react"
import _ from "lodash"
import ReactCountryFlag from "react-country-flag"
import ContinentIcon from "../../components/icons/icon"
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
        dropdownMenu.push(<div className="dropdown-header" key={continent} >
          <Label check>
            <Input type="checkbox" checked={_.intersection(_.map(group, 'country'), this.props.data.filters).length === group.length} onChange={() => this.props.toggleFiltersGroup(continent)} />{' '}
            <ContinentIcon continent={continent} width="16" height="16" />{' '}
            {continent}
          </Label>
        </div>)

        _.forEach(group, item => {
          dropdownMenu.push(<div className="dropdown-item" key={item.country} >
            <Label check>
              <Input type="checkbox" checked={this.props.data.filters.indexOf(item.country) !== -1} onChange={() => this.props.toggleFilter(item.country)} />{' '}
              <ReactCountryFlag countryCode={item.code} svg style={{ width: '1em', height: '1em' }}/>{' '}
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
                <DropdownToggle caret>Top</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.props.top(this.props.data.original, 3, 'cases')}>Top 3</DropdownItem>
                  <DropdownItem onClick={() => this.props.top(this.props.data.original, 5, 'cases')}>Top 5</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
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