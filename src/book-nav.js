import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap'
import ControlForm from './control-form';

class BookNav extends Component {


  render() {
    return (
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Steven's Books</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form>
            <ControlForm {...this.props} /> 
            <Button bsStyle="primary"
                    style={{float:"right"}}
                    onClick={this.props.openModal.bind(this, false)}>
                    Add Book
            </Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}



export default BookNav;
