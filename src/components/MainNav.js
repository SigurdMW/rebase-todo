import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

class MainNav extends Component {
	constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

	render(){
		return (
			<div>
			 <AppBar
			    title={this.props.title}
			    iconElementLeft={<IconButton><NavigationMenu onTouchTap={this.handleToggle} /></IconButton>}
			  />
			  <Drawer 
	          open={this.state.open} 
	          docked={false}
	          onRequestChange={(open) => this.setState({open})}>
	          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
	          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
	        </Drawer>
	    	</div>
		)
	}
}

export default MainNav;