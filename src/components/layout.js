import React from "react"
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import './layout.scss'

let isOpen = false
const toggle = () => {
  isOpen = !isOpen
  return isOpen
}

export default ({ children }) => (
  <div id="main">
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Covid-19</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://walid.ovh">Me</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>Charts</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Charts</DropdownItem>
              <DropdownItem>Statistics</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Recent</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>

    <Container fluid>
      {children}
    </Container>
  </div>
)