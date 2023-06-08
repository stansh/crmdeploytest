import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { SideNav } from './SideNav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div class = "container-fluid" >
            
            <Container fluid>
                <NavMenu class = "nav"/>
               
                <div class="row" >
                    <SideNav />
                    <div class="col-lg-10"> {this.props.children}</div>
                </div>

        
            </Container>
      </div>
    );
  }
}
