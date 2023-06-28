import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { SideNav } from './SideNav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div class= "" >
            
            <Container fluid>
                <NavMenu class = "nav"/>
               
                <div class="row mt-5 mx-2"  >
                    <SideNav />
                    <div class="col-lg-10"> {this.props.children}</div>
                </div>

        
            </Container>
      </div>
    );
  }
}
