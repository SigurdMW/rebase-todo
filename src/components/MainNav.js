import React, { Component } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Logout from './auth/Logout'
import { getLoggedInUser } from '../services/auth'
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
    	isLoading: true
    }
  }

  componentDidMount(){
  	if( getLoggedInUser()) {
  		const uid = getLoggedInUser()
  		this.ref = base.listenTo(`${uid}/lists`, {
  			context: this,
	  		then(data){ this.setState({ isLoading: false, lists: data })}
  		})
  	}
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

	goToList = (key, list) => {
	console.log(list)
		browserHistory.push({
			pathname: `/lists/${key}`,
  		state: { list }
		})
	}

  renderMenuItem = (key, index) => {
		const list = this.state.lists[key]
  	return (
  		<MenuItem onTouchTap={(e) => {e.preventDefault();this.goToList(key, list);this.handleClose()}} key={key}>{ list.title }</MenuItem>
  	)
  }

	render(){
		const style = {
			color: "#fff",
			textDecoration: "none"
		}

		const { lists } = this.state
		return (
			<div>
			 <AppBar
			    title={<Link to="/" 
			    style={style}>{this.props.title}</Link>}
			    iconElementLeft={<IconButton><NavigationMenu onTouchTap={(e) => {e.preventDefault();this.handleToggle()}} /></IconButton>}
			    iconElementRight={<Logout />}
			  />
			  <Drawer 
	          open={this.state.open} 
	          docked={false}
	          onRequestChange={(open) => this.setState({open})}>
	          <AppBar 
	          	title="Todo lists"
	          	iconElementLeft={<div></div>}
	          />
	          {
	          	Object
	          		.keys(lists)
	          		.map(this.renderMenuItem)
	          }
	        </Drawer>
	    	</div>
			)
	}
}

export default MainNav;