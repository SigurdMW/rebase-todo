import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainNav from './MainNav';
import MainFooter from './Footer';
import { Container } from 'react-grid-system';

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <MainNav title="React & Redux Todo" />
          <Container fluid={true}>
            {React.cloneElement(this.props.children, this.props)}
          </Container>
          <MainFooter />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;