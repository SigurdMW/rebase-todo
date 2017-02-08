import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainNav from './MainNav';
import MainFooter from './Footer';
import { Container } from 'react-grid-system'

class App extends Component {
	render(){
		return (
			<MuiThemeProvider>
				<div>
					<MainNav title="Firebase todo" />
					<Container fluid={true}>
						{this.props.children}
					</Container>
					<MainFooter />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App;