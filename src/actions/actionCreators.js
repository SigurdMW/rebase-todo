// add task
export function addTask(text){
	return {
		type: 'ADD_TASK',
		text,
		completed: false
	}
}

// complete task
export function toggleCompletedTask(index){
	return {
		type: 'TOGGLE_TASK',
		index
	}
}

// update task
export function updateTask(index, text){
	return {
		type: 'UPDATE_TASK',
		index,
		text
	}
}