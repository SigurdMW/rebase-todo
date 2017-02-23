import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import { logOutUser } from '../../services/auth'

class LoggedInMenu extends Component {

	render(){
		const style = {
			color: "#fff",
			textDecoration: "none",
			marginTop: "8px"
		}

		const { isAuthUser } = this.props

		if (isAuthUser){
			return (
			  <IconMenu
			    {...this.props}
			    iconButtonElement={
			      <IconButton><MoreVertIcon color="#fff" /></IconButton>
			    }
			    targetOrigin={{horizontal: 'right', vertical: 'top'}}
			    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			  >
			    <MenuItem primaryText="Profil" />
			    <MenuItem 
			    	primaryText="Sign out" 
			    	onTouchTap={(e) => {
							e.preventDefault()
							logOutUser()
						}} />
			  </IconMenu>
			)
		}
		return false
	}
}

export default LoggedInMenu