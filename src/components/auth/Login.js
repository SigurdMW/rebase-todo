import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Row, Col } from 'react-grid-system'
import base from '../../base'
import { Link } from 'react-router'

class Login extends Component {
	constructor(){
		super();

		this.state = {
			error: null
		}
	}

	firebaseLogin = (email, password) => {
		base.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				const userInfo = {
					name: user.displayName,
					email: user.email,
					uid: user.uid
				}

				localStorage.setItem("user", JSON.stringify(userInfo))
				this.props.router.replace('/')
				//setLoginDataToLS(user.uid, userInfo);


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
	
	handleSubmit = (e) => {
		e.preventDefault();
		//this.props.addTask(this.refs.task.getValue());
		//	this.refs.task.getInputNode().value = ''
		const { email, password } = this.refs;
		this.firebaseLogin(email.getValue(), password.getValue())
	}

	render(){
		return (
			<Row>
				<Col md={2} offset={{ md: 5 }}>
					<form onSubmit={this.handleSubmit}>
						<h1>Login</h1>
						<p>Please login to your todo-app.</p>
						{
							this.state.error &&
							 <Snackbar
			          open={true}
			          message={this.state.error}
			          autoHideDuration={4000}
			        />
						}
						<TextField
				      hintText="Email"
				      floatingLabelText="Your email address"
				      type="email"
				      ref="email"
				      autoFocus={true}
				    /><br />
				    <TextField
				      hintText="Password"
				      floatingLabelText="Password"
				      type="password"
				      ref="password"
				    /><br /><br /> 
						<RaisedButton label="Login" type="submit" primary={true} />
						<br />
					</form>

					<br />
					<Link to="/register">Register new user</Link>
				</Col>
			</Row>			
		)
	}
}

export default Login