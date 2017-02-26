import React, { Component } from 'react'
import { addUser } from '../../services/users'
import { browserHistory } from 'react-router'

// component
import NewUserForm from '../../components/users/NewUserForm'

class NewUser extends Component {

	constructor(){
		super()
		this.state = {
			emailError: null,
			pwdError: null,
			formError: null
		}
	}

	addNewUser = (email, password) => {
		this.setState({
			emailError:null, 
			pwdError:null
		})
		if(!email){
			this.setState({emailError: "Email is required"})
		}
		if(!password){
			this.setState({pwdError: "Password is required"})
		}
		if(email && password){
			this.setState({
				emailError:null,
				pwdError: null
			})
			addUser(email, password, this.checkAuthAndRedirect)
		}
	}

	checkAuthAndRedirect = () => {
		if(this.props.isAuthUser){
			browserHistory.push("/")
		} else {
			this.setState({
				formError: "Something went wrong. Please try again."
			})
		}
	}

	render(){
		return (
			<NewUserForm 
				addNewUser={this.addNewUser} 
				emailError={this.state.emailError} 
				pwdError={this.state.pwdError}
				formError={this.state.formError}
			/>
		)
	}
}

NewUser.propTypes = {
  isAuthUser: React.PropTypes.bool,
  authUser: React.PropTypes.object
}

export default NewUser