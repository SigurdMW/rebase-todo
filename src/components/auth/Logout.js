import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { logOutUser } from '../../services/auth'

class Logout extends Component {

	render(){
		const style = {
			color: "#fff",
			textDecoration: "none",
			marginTop: "8px"
		}

		const { isAuthUser } = this.props

		if (isAuthUser){
			return (
				<FlatButton style={style} label="Log out" onTouchTap={(e) => {e.preventDefault();logOutUser()}} />
			)
		}
		return false
	}
}

export default Logout