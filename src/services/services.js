import base from '../base'
import { browserHistory } from 'react-router'

export function syncTodoLists (_this, uid) {
	_this.ref = base.syncState(`${uid}/lists`, {
	  context: _this,
	  state: 'lists'
	});
}

export function removeBaseSync(_this){
	base.removeBinding(_this.ref)
}

export function getLoggedInUser(){
	const user = JSON.parse(localStorage.getItem("user"))
	return (user) ? user.uid : null;
}

function removeLoggedInUser(){
	localStorage.removeItem("user")
}

export function logOutUser () {
	base.unauth()
	removeLoggedInUser()
	browserHistory.push('/login');
}