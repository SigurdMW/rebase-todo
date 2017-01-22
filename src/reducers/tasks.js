function tasks(state = [], action){
	switch(action.type){
		
		case 'ADD_TASK' :
			const newState = {...state};
			const task = {
				text: action.text,
				completed: action.completed
			};
			const unique = Date.now();
			newState[unique] = task;
			return newState;
		
		case 'TOGGLE_TASK' : 
			const state2 = {...state};
			const toggledTask = state2[action.index];
			toggledTask.completed = !state[action.index].completed;
			state2[action.index] = toggledTask;
			return state2;

		case 'UPDATE_TASK' :
			const state3 = {...state};
			const updatedTask = state3[action.index];
			updatedTask.text = action.text;
			state3[action.index] = updatedTask;
			return state3;
		
		default : 
			return state;
	}
	return state;
}

export default tasks;