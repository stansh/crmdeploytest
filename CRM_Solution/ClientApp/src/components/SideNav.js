﻿import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './Style.css';

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
            <ul class="nav flex-column col-lg-1 pb-3"  >
                
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/leads">Leads</Link>
                <Link to="/products">Products</Link>
                
            </ul>
        );
    }
}
