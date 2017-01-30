// this is to separate duties - handeling the single todo should happen here.
const todo = (state, action) => {
	switch(action.type){
		
		case 'ADD_TASK':
			return {
					text: action.text,
					completed: action.completed,
					id: Date.now()
				}
		
		case 'TOGGLE_TASK': 
				if(state.id !== action.id) {
					return state;
				}

				return {
					...state,
					completed: !state.completed
				}

		case 'UPDATE_TASK':
			if(state.id !== action.id){
				return state;
			}
			return {
				...state,
				text: action.text
			}

		default: 
			return state;
	}
	return state;
}


// this is the reducer
function tasks(state = [], action){
	switch(action.type){
		
		case 'ADD_TASK':
			return [
				...state, 
				todo(undefined, action)
			];
		
		case 'TOGGLE_TASK': 
			return state.map(t => todo(t, action))

		case 'UPDATE_TASK':
			return state.map(t => todo(t, action))

		case 'DELETE_TASK':
			const delState = {...state};
			delete delState[action.index];
			return delState;
		
		default: 
			return state;
	}
	return state;
}

export default tasks;