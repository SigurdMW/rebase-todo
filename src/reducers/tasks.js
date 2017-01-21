function tasks(state = [], action){
	switch(action.type){
		case 'ADD_TASK' :
			console.log("ADD TASK NOW!!");
			const newState = {...state};
			const task = {
				text: action.text,
				completed: action.completed
			};
			const unique = Date.now();
			newState[unique] = task;
			return newState;
			/*
			const i = action.index;
			
			const newState = {...state};
			newState[i].likes += 1;
			return Object.values(newState);
			/// Wes Bos solution:
			return [
				...state.slice(0,i), // before the one we're updating
				{...state[i], likes: state[i].likes +1},
				...state.slice(i+1), // after the one we're updating
			]
			*/
		default : 
			return state;
	}
	return state;
}

export default tasks;