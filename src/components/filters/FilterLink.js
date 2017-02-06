import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'

class FilterLink extends Component {
	handleClick = (e) => {
		e.preventDefault();
		this.props.setFilter(this.props.filter);
	}
	render(){
		if(this.props.currentFilter == this.props.filter){
			return <FlatButton label={this.props.children} disabled={true} />
		}

		return (
			<FlatButton ref="filterLink" onClick={this.handleClick} label={this.props.children} />
		)
	}
}

export default FilterLink