import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton	 from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton'
import { Card } from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';
import { syncTodoLists, getLoggedInUser } from '../../services/services'
import { addList } from '../../services/lists'


class Home extends Component {
	constructor(){
		super()
		this.state = {
			lists: {}
		}
	}

	componentDidMount(){
		const uid = getLoggedInUser();
		syncTodoLists(this, uid)
	}

	handleAddList = () => {
		const newList = {id:123, title: "handleAddList", todos: {asdaa1231sda: {name:"test", completed:true}}}
		const listid = addList(newList)
	}

	renderLists = (key, index) => {
		const list = this.state.lists[key]
		const todoLength = (list.todos) ? Object.keys(list.todos).length : 0;
		var secondaryText = ""

		if(todoLength === 1){
			secondaryText = "1 todo"
		} else {
			secondaryText = `${todoLength} todos`
		}

		return (
			<ListItem
				key={key}
        primaryText={list.title}
        secondaryText={secondaryText}
        insetChildren={false}
      />
		)
	}

	render(){
		const lists = this.state.lists
		return (
			<div>asdasda sd<br /> 
				<button onClick={this.handleAddList}>test</button>
				<Row>
	      		<Col md={6}>
			      	<Card>
				      	<List>
				        	<Subheader>Your to-dos</Subheader>
				        	{
										Object
											.keys(lists)
											.map(this.renderLists)
									}
				      	</List>
				      </Card>
				     </Col>
				    </Row>
			</div>
		)
	}
}

export default Home