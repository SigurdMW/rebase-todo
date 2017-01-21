import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainButton from './components/MainButton';
import MainNav from './components/MainNav';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <MainNav title="React & Redux Todo" />
          <MainButton />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
