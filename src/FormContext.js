import React, { useContext, useReducer } from 'react'
import reducer from './Reducer'
const AppContext = React.createContext()

const initialState = {
	loading: false,
	occupationList: [],
	stateList: [],
	person: { name: '', email: '', password: '', occupation: '', state: '' },
	alert: { show: false, msg: '', type: '' },
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const showAlert = (show = false, type = '', msg = '') => {
		dispatch({ type: 'SET_ALERT', payload: { show, msg, type } })
	}

	const getData = () => {
		fetch('https://frontend-take-home.fetchrewards.com/form')
			.then(async (response) => {
				const data = await response.json()

				if (!response.ok) {
					// get error message from body or default to response statusText
					const error = (data && data.message) || response.statusText
					return Promise.reject(error)
				}

				dispatch({ type: 'SET_DATA', payload: data })
			})
			.catch((error) => {
				console.error('Error on GET request.', error)
			})
	}

	const postData = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(state.person),
		}

		fetch('https://frontend-take-home.fetchrewards.com/form', requestOptions)
			.then(async (response) => {
				// response is an empty string - trying to jsonify it throws error

				if (!response.ok) {
					// get error message from body or default to response statusText
					const error = response.statusText
					return Promise.reject(error)
				}

				dispatch({ type: 'RESET_DATA' })
				showAlert(true, 'success', 'Info submitted successfully')
			})
			.catch((error) => {
				console.error('Error on POST request.', error)
			})
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		dispatch({ type: 'SET_VALUE', payload: { name, value } })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			state.person.name.includes(' ') &&
			state.person.email.includes('@') &&
			state.person.password &&
			state.person.occupation &&
			state.person.state
		) {
			postData()
		} else {
			showAlert(true, 'danger', 'Please enter missing info')
		}
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				showAlert,
				getData,
				postData,
				handleChange,
				handleSubmit,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
