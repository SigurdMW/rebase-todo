import React, { Component } from 'react'

class TodoLists extends Component {
	render(){
		return (
			<div>
				Todo-list id is: {this.props.params.listId}
			</div>
		)
	}
}

export default TodoLists