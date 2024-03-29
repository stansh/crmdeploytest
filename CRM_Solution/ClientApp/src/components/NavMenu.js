import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './Style.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header >
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" light width ="100%">
          <Container fluid >
                    <NavbarBrand tag={Link} to="/"><img src = "/Images/logo.PNG" width="30%" class="float-start" alt="logo" /></NavbarBrand >
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {/*<NavItem>*/}
                {/*  <NavLink tag={Link} className="text-dark" to="/Dashboard">Home</NavLink>*/}
                {/* </NavItem>*/}
                {/*<NavItem>*/}
                {/*    <NavLink tag={Link} className="text-dark" to="/FetchData">Weather</NavLink>*/}
                {/*</NavItem>*/}

                {/*<LoginMenu>*/}
                {/*</LoginMenu>*/}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
