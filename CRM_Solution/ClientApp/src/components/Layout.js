import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { SideNav } from './SideNav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
          <div>
            <NavMenu />
            <Container >
                <div class="row" >
                    <SideNav class="col-lg-1" />
                    <div class="col-lg-10"> {this.props.children}</div>
                </div>
        
            </Container>
      </div>
    );
  }
}
