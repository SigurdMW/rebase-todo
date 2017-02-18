import base from '../base'

export function syncTodoLists (_this, uid) {
	_this.ref = base.syncState(`${uid}/lists`, {
	  context: _this,
	  state: 'lists'
	});
}

export function removeBaseSync(_this){
	base.removeBinding(_this.ref)
}