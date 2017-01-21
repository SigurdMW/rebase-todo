// add task
export function addTask(text){
	return {
		type: 'ADD_TASK',
		text,
		completed: false
	}
}