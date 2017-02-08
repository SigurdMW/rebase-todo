import base from '../base';

export function syncTodoLists (_this, uid) {
	_this.ref = base.syncState(`${uid}/lists`, {
	  context: _this,
	  state: 'lists'
	});
}

export function getLoggedInUser(){
	const user = JSON.parse(localStorage.getItem("user"))
	return (user) ? user.uid : null;
}