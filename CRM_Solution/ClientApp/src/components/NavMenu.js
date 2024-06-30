import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
//import './Style.css';

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
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom navbar-dark" light>
          <Container fluid >
                    <NavbarBrand tag={Link} to="/"><img src = "/Images/logo1.PNG"  className="img-fluid w-50 float-center float-md-start" alt="logo" /></NavbarBrand >
            <NavbarToggler onClick={this.toggleNavbar} className="" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow text-center text-md-end">
                <NavItem className="">
                    <NavLink tag={Link} className="text-white" to="/Dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                   <NavLink tag={Link} className="text-white" to="">Account</NavLink>
                </NavItem>
                <NavItem>
                   <NavLink tag={Link} className="text-white" to="">Log Out</NavLink>
                </NavItem>
               {/* <LoginMenu>
               </LoginMenu> */}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
