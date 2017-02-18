import React, { Component } from 'react'
//import TextField from 'material-ui/TextField'
//import RaisedButton	 from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
//import FlatButton from 'material-ui/FlatButton'
import { Card } from 'material-ui/Card'
import { Row, Col } from 'react-grid-system'
import { syncTodoLists, removeBaseSync } from '../../services/services'
import { getLoggedInUser, getUser } from '../../services/auth'
import { addList } from '../../services/lists'
import { base } from '../../base'
import CircularProgress from 'material-ui/CircularProgress'


class Home extends Component {
	constructor(){
		super()
		this.state = {
			lists: {},
			isLoading: true
		}
	}

	componentDidMount(){
		const uid = getLoggedInUser();
		syncTodoLists(this, uid)

		getUser()
	}

	componentWillUnmount(){
		removeBaseSync(this)
	}

	handleAddList = () => {
		const newList = {id:123, title: "handleAddList", todos: {asdaa1231sda: {name:"test", completed:true}}}
		addList(newList)
		// const listid = addList(newList)
	}

	goToList = (key, list) => {
		this.props.router.push({
			pathname: `/lists/${key}`,
  		state: { list }
		})
	}

	renderLists = (key, index) => {
		const list = this.state.lists[key]
		const todoLength = (list.tasks) ? Object.keys(list.tasks).length : 0;
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
        onTouchTap={(e) => {e.preventDefault();this.goToList(key, list)}}
        //onClick={() => this.goToList(key, list)}
       />
		)
	}

	render(){
		const lists = this.state.lists
		const { isLoading } = this.state
		const loaderStyle = {
			paddingLeft: "16px"
		}
		return (
			<div>
				<h1>My lists</h1>
				<p>Here are your todo-lists:</p>
				<Row>
	      		<Col md={6}>
			      	<Card>
				      	<List>
								<Subheader>All your todo-lists</Subheader>
								{isLoading && 
				      		<CircularProgress style={loaderStyle} thickness={7} />
				      	}
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