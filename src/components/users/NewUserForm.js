import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'


class NewUserForm extends Component {

	handleAddUser = (e) => {
		e.preventDefault()
		const email = this.refs.email.getValue()
		const password = this.refs.pwd.getValue()
		this.props.addNewUser(email, password)
	}

	render(){
		return (
			<div>
				<h1>New user</h1>
				<p>Congrats! You're about to create a new and awesome todo-app user!</p>
				<form onSubmit={this.handleAddUser}>
    			<TextField
      			floatingLabelText="Email"
      			type="email"
      			ref="email"
      			errorText={this.props.emailError}
    			/>
    			<br />
    			<TextField
      			floatingLabelText="password"
      			type="password"
      			ref="pwd"
      			errorText={this.props.pwdError}
    			/>
    			<br />
    			<RaisedButton label="Add user" type="submit" primary={true} />
				</form>
				{
					this.props.formError &&
					 <Snackbar
	          open={true}
	          message={this.props.formError}
	          autoHideDuration={4000}
	        />
				}
			</div>
		)
	}
}

NewUserForm.propTypes = {
  addNewUser: React.PropTypes.func.isRequired
}

export default NewUserForm