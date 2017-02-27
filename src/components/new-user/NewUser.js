import React, { Component } from 'react'
import { addUser } from '../../services/users'
import { browserHistory } from 'react-router'

// component
import NewUserView from './NewUserView'


class NewUser extends Component {

	addNewUser = (email, password) => {
		addUser(email, password, this.checkAuthAndRedirect)
	}

	checkAuthAndRedirect = () => {
		if(this.props.authUser){
			browserHistory.push("/")
		} else {
			console.log("no user")
			console.log(this.props.authUser)
		}
	}

	render(){
		return (
			<NewUserView addNewUser={this.addNewUser} />
		)
	}
}

NewUser.propTypes = {
  isAuthUser: React.PropTypes.bool,
  authUser: React.PropTypes.object
}

export default NewUser