import './App.css'
import React, { useState, useEffect } from 'react'
import Alert from './Alert'

function App() {
	const [occupationList, setOccupationList] = useState([])
	const [stateList, setStateList] = useState([])
	const [person, setPerson] = useState({
		name: '',
		email: '',
		password: '',
		occupation: '',
		state: '',
	})
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: '',
	})

	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg })
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

				setOccupationList(data.occupations)
				setStateList(data.states)
			})
			.catch((error) => {
				console.error('Error on GET request.', error)
			})
	}

	const postData = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(person),
		}

		fetch('https://frontend-take-home.fetchrewards.com/form', requestOptions)
			.then(async (response) => {
				const isJson = response.headers
					.get('content-type')
					?.includes('application/json')
				const data = isJson && (await response.json())

				if (!response.ok) {
					// get error message from body or default to response statusText
					const error = (data && data.message) || response.statusText
					return Promise.reject(error)
				}

				setPerson({
					name: '',
					email: '',
					password: '',
					occupation: '',
					state: '',
				})
			})
			.catch((error) => {
				console.error('Error on POST request.', error)
			})
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setPerson({ ...person, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			person.name.includes(' ') &&
			person.email.includes('@') &&
			person.password &&
			person.occupation &&
			person.state
		) {
			postData()
			showAlert(true, 'success', 'Info submitted successfully')
		} else {
			showAlert(true, 'danger', 'Please enter missing info')
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<main>
			<section className='section-center'>
				<form className='form'>
					{alert.show && <Alert {...alert} removeAlert={showAlert} />}
					<h3>Submit Info Form</h3>
					<div className='form-control'>
						<label htmlFor='name'>Full Name : </label>
						<input
							type='text'
							id='name'
							name='name'
							value={person.name}
							onChange={handleChange}
							placeholder='must be at least 3 characters in length and include a space'
							pattern='[a-zA-Z]+[\s]+[a-zA-Z]{3,45}'
							required
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='email'>Email : </label>
						<input
							type='email'
							id='email'
							name='email'
							value={person.email}
							onChange={handleChange}
							placeholder='must contain @'
							required
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password : </label>
						<input
							type='password'
							id='password'
							name='password'
							value={person.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='occupation'>Occupation : </label>
						<select
							id='occupation'
							name='occupation'
							onChange={handleChange}
							value={person.occupation}
							className={person.occupation ? '' : 'highlight'}
							required
						>
							{occupationList.length === 0 && (
								<option>Error: No occupations found.</option>
							)}
							{occupationList.length > 0 && person.occupation === '' && (
								<option>Select an occupation.</option>
							)}
							{occupationList.map((occ, i) => (
								<option key={i} value={occ}>
									{occ}
								</option>
							))}
						</select>
					</div>
					<div className='form-control'>
						<label htmlFor='state'>State : </label>
						<select
							id='state'
							name='state'
							onChange={handleChange}
							value={person.state}
							className={person.state ? '' : 'highlight'}
							required
						>
							{stateList.length === 0 && (
								<option>Error: No states found.</option>
							)}
							{stateList.length > 0 && person.state === '' && (
								<option>Select a state.</option>
							)}
							{stateList.map((stateObj, i) => (
								<option key={i} value={stateObj.name}>
									{stateObj.name}
								</option>
							))}
						</select>
					</div>
					<button className='submit-btn' type='submit' onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</section>
		</main>
	)
}

export default App
