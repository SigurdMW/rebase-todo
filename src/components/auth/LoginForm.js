import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Row, Col } from 'react-grid-system'
import { Link } from 'react-router'

class LoginForm extends Component {
	
	handleSubmit = (e) => {
		e.preventDefault()
		const { email, password } = this.refs
		this.props.handleLogin(email.getValue(), password.getValue())
	}

	render(){
		return (
			<Row>
				<Col md={2} offset={{ md: 5 }}>
					<form onSubmit={this.handleSubmit}>
						<h1>Login</h1>
						<p>Please login to your todo-app.</p>
						{
							this.props.error &&
							 <Snackbar
			          open={true}
			          message={this.props.error}
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

LoginForm.propTypes = {
	error: React.PropTypes.string,
	handleLogin: React.PropTypes.func.isRequired
}

export default LoginForm