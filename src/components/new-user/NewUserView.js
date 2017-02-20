import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class NewUserView extends Component {

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
    			/>
    			<br />
    			<TextField
      			floatingLabelText="password"
      			type="password"
      			ref="pwd"
    			/>
    			<br />
    			<RaisedButton label="Add user" type="submit" primary={true} />
				</form>
			</div>
		)
	}
}

export default NewUserView