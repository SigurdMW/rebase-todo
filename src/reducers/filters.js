// this is the reducer
function filters(state = 'SHOW_ALL', action){
	switch(action.type){
		
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		
		default: 
			return state;
	}
	return state;
}

export default filters;