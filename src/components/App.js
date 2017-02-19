import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainNav from './MainNav'
import MainFooter from './Footer'
import { Container } from 'react-grid-system'
import base from '../base'

class App extends Component {
	constructor(){
		super()

		this.state = {
			isLoggedIn: false
		}
	}

	componentDidMount(){
		this.authcheck = base.onAuth(this.authDataCallback)
	}


	authDataCallback = (user) => {
	  if (user) {
	    this.setState({
	    	isLoggedIn: true
	    })
	  } else {
	  	this.setState({
	  		isLoggedIn: false
	  	})
	  }
	}

	render(){
		
		return (
			<MuiThemeProvider>
				<div>
					<MainNav title="Firebase todo" isLoggedIn={this.state.isLoggedIn} />
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