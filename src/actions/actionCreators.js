// add task
export function addTask(text, completed = false){
	return {
		type: 'ADD_TASK',
		text,
		completed
	}
}

// complete task
export function toggleCompletedTask(id){
	return {
		type: 'TOGGLE_TASK',
		id
	}
}

// update task
export function updateTask(id, text){
	return {
		type: 'UPDATE_TASK',
		id,
		text
	}
}

// delete task
export function deleteTask(id){
	return {
		type: 'DELETE_TASK',
		id
	}
}

export function setFilter(filter){
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter
	}
}