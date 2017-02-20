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
			isAuthUser: false,
			authUser: {}
		}
	}

	componentDidMount(){
		this.authcheck = base.onAuth(this.authDataCallback)
	}


	authDataCallback = (user) => {
	  if (user) {
	    this.setState({
	    	isAuthUser: true,
	    	authUser: user
	    })
	  } else {
	  	this.setState({
	  		isAuthUser: false,
	  		authUser: {}
	  	})
	  }
	}

	render(){
		
		return (
			<MuiThemeProvider>
				<div>
					<MainNav title="Firebase todo" isAuthUser={this.state.isAuthUser} />
					<Container fluid={true}>
						{React.cloneElement(
							this.props.children, 
							{ 
								isAuthUser: this.state.isAuthUser, 
								authUser: this.state.authUser 
							}
						)}
					</Container>
					<MainFooter />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App;