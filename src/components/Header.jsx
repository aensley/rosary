import React, { Component } from 'react'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import LaunchButton from './LaunchButton'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { isOpen: false }
  }

  toggle () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <header>
        <Navbar color='dark' dark expand='xs'>
          <Container>
            <NavbarBrand href='/'>
              <strong>Rosary</strong>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='#' className='text-success no-click'>
                    {this.props.day}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <LaunchButton
                    text={this.props.category + ' Mysteries'}
                    category={this.props.category}
                    launchAction={this.props.launchAction}
                  />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}
