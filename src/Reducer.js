const reducer = (state, action) => {
	if (action.type === 'SET_ALERT') {
		return {
			...state,
			alert: {
				show: action.payload.show,
				msg: action.payload.msg,
				type: action.payload.type,
			},
		}
	}
	if (action.type === 'SET_DATA') {
		return {
			...state,
			occupationList: action.payload.occupations,
			stateList: action.payload.states,
		}
	}
	if (action.type === 'RESET_DATA') {
		return {
			...state,
			person: { name: '', email: '', password: '', occupation: '', state: '' },
		}
	}
	if (action.type === 'SET_VALUE') {
		return {
			...state,
			person: { ...state.person, [action.payload.name]: action.payload.value },
		}
	}
	throw new Error('no matching action type')
}

export default reducer
