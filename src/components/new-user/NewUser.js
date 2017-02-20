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
			const { authUser } = this.props

			console.log(authUser)
			
			const userInfo = {
					email: authUser.email,
					uid: authUser.uid
			}
			localStorage.setItem("user", JSON.stringify(userInfo))
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