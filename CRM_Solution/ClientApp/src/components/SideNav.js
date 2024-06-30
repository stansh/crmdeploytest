import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';


export class SideNav extends Component {
    static displayName = SideNav.name;

    //constructor(props) {
    //    super(props);

    //    this.toggleNavbar = this.toggleNavbar.bind(this);
    //    this.state = {
    //        collapsed: true
    //    };
    //}

    //toggleNavbar() {
    //    this.setState({
    //        collapsed: !this.state.collapsed
    //    });
    //}

    render() {
        return (
            
            <ul className="nav col col-lg-1 flex-column sidebar my-2 my-md-1">
                <Link className="my-md-3 py-2 py-md-2 fs-md-6 text-center text-md-start" to="/dashboard"><i class="bi bi-pie-chart-fill mx-2"></i> Dashboard</Link>
                <Link className="my-md-3 py-2 py-md-2 fs-md-6 text-center text-md-start" to="/customers"><i class="bi bi-file-person-fill mx-2"></i>Customers</Link>
                <Link className="my-md-3 py-2 py-md-2 fs-md-6 text-center text-md-start" to="/leads"><i class="bi bi bi-people-fill mx-2"></i>Leads</Link>
                <Link className="my-md-3 py-2 py-md-2 fs-md-6 text-center text-md-start" to="/products"><i class="bi bi-gear-fill mx-2"></i>Products</Link>

                
            </ul>
        );
    }
}
