import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { SideNav } from './SideNav';

export class Layout extends Component {
  static displayName = Layout.name;
  render () {
    return (
        <>
            
            <Container fluid>
                <NavMenu className = "nav"/>
                <div className ="row gx-2">
                  {/* <SideNav classname="nav flex-column col-md-2 pb-3" />    */}
                  <SideNav className="col col-lg-1"/>
                
                  
                
                  {/* <SideNav classname="nav flex-column col-md-2 pb-3" />    */}
                    <main className="col-lg-11 ">{this.props.children}</main>
                </div>

        
            </Container>
      </>
    );
  }
}
