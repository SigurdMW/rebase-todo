import React, { Component } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import LoggedInMenu from './auth/Logout'
import base from '../base'
import { browserHistory } from 'react-router'

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

class MainNav extends Component {
	constructor(props) {
    super(props)
    
    this.state = {
    	lists: {},
    	open: false,
    	isLoading: true,
    	isAuthUser: false,
    	authUser: {}
    }
  }

  getLists = (authUser) => {
  	if( authUser.uid ) {
  		this.ref = base.listenTo(`${authUser.uid}/lists`, {
  			context: this,
	  		then(data){ this.setState({ isLoading: false, lists: data })}
  		})
  	}
  }

  componentWillReceiveProps(nextProps, nextState){
		if(this.state.isAuthUser !== nextState.isAuthUser){
			this.setState({
	  		isAuthUser: nextProps.isAuthUser,
	  		authUser: nextProps.authUser
  		})

			this.getLists(nextProps.authUser)
		}
	}

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

	goToList = (key, list) => {
		browserHistory.push({
			pathname: `/lists/${key}`,
  		state: { list, key }
		})
	}

  renderMenuItem = (key, index) => {
		const list = this.state.lists[key]
  	return (
  		<MenuItem 
  			onTouchTap={(e) => {
  				e.preventDefault()
  				this.goToList(key, list)
  				this.handleClose()}
  			} 
  			key={key}>
  			{ list.title }
  		</MenuItem>
  	)
  }

	render(){
		const style = {
			color: "#fff",
			textDecoration: "none"
		}

		const { lists } = this.state
		const { isAuthUser } = this.state
		const haveNoLists = (Object.keys(lists).length === 0) ? true : false

		return (
			<div>
			 <AppBar
			    title={<Link to="/" 
			    style={style}>{this.props.title}</Link>}
			    iconElementLeft={
			    	<IconButton 
			    		onTouchTap={(e) => {
			    			e.preventDefault()
			    			this.handleToggle()}
			    		}>
			    		<NavigationMenu />
			    	</IconButton>
			    }
			    iconElementRight={<LoggedInMenu isAuthUser={this.state.isAuthUser} />}
			  />
			  {isAuthUser &&
				  <Drawer 
		          open={this.state.open} 
		          docked={false}
		          onRequestChange={(open) => this.setState({open})}>
		          <AppBar 
		          	title="Todo lists"
		          	iconElementLeft={<div></div>}
		          />
		          {haveNoLists &&
								<MenuItem>You have no lists.</MenuItem>
		          }
		          {
		          	Object
		          		.keys(lists)
		          		.map(this.renderMenuItem)
		          }
		        </Drawer>
	        }
	    	</div>
			)
	}
}

MainNav.propTypes = {
  isAuthUser: React.PropTypes.bool,
  authUser: React.PropTypes.object
}

export default MainNav;