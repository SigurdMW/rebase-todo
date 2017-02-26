import React, { Component } from 'react'
import LoginForm from '../../components/auth/LoginForm'
import base from '../../base'
import { Link } from 'react-router'

class Login extends Component {
	constructor(){
		super()

		this.state = {
			error: null
		}
	}

	firebaseLogin = (email, password) => {
		base.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				/* CAN BE USED TO TAKE USER TO REQUESTED URL
				const { location } = this.context.router;
				
				if (location.state && location.state.nextPathname) {
					// if requested other URL than default after login, this handles that:
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/home')
        }
				//this.context.router.push('/');
				*/
			})
			.catch((error) => {
				//const errorCode = error.code;
        const errorMessage = error.message
	     	this.setState({ error: errorMessage })
	      console.log(error)
      });
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isAuthUser){
			this.props.router.replace('/')
		}
	}
	
	handleLogin = (email, password) => {
		this.setState({
			error: null
		})
		this.firebaseLogin(email, password)
	}

	render(){
		return (
			<LoginForm error={this.state.error} handleLogin={this.handleLogin} />
		)
	}
}

export default Login