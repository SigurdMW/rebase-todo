import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { Card } from 'material-ui/Card'
import { Row, Col } from 'react-grid-system'
import { syncTodoLists, removeBaseSync } from '../../services/services'
import { getLoggedInUser } from '../../services/auth'
import { addList } from '../../services/lists'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


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
	}

	componentWillUnmount(){
		removeBaseSync(this)
	}

	handleAddList = (e) => {
		e.preventDefault()
		const newList = {title: this.refs.listTitle.getValue()}
		addList(newList)
		this.refs.listTitle.getInputNode().value = ""
	}

	goToList = (key, list) => {
		this.props.router.push({
			pathname: `/lists/${key}`,
  		state: { list, key }
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
				<form onSubmit={this.handleAddList}>
					<TextField
			      floatingLabelText="Add list"
			      ref="listTitle"
			    />
			    <RaisedButton label="Add list" primary={true} type="submit" />
				</form>
				<p>Here are your todo-lists:</p>
				<Row>
	      		<Col md={6}>
			      	<Card>
				      	<List>
								<Subheader>All your todo-lists</Subheader>
								{isLoading && 
				      		<CircularProgress style={loaderStyle} />
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