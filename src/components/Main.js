import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainNav from './MainNav';

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <MainNav title="React & Redux Todo" />
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;