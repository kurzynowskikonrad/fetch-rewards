import './App.css'
import React, { useEffect } from 'react'
import Alert from './Alert'
import { useGlobalContext } from './FormContext'
import TextInputField from './TextInput'
import SelectInputField from './SelectInput'

function App() {
	const { person, occupationList, stateList, alert, getData, handleSubmit } =
		useGlobalContext()

	useEffect(() => {
		getData()
	})

	return (
		<main>
			<section className='section-center'>
				<form className='form'>
					{alert.show && <Alert {...alert} />}
					<h3>Submit Info Form</h3>
					<TextInputField
						label='Full Name : '
						type='text'
						id='name'
						value={person.name}
						placeholder='must be at least 3 characters in length and include a space'
						pattern='[a-zA-Z]+[\s]+[a-zA-Z]{3,45}'
					/>
					<TextInputField
						label='Email : '
						type='email'
						id='email'
						value={person.email}
						placeholder='must contain @'
					/>
					<TextInputField
						label='Password : '
						type='password'
						id='password'
						value={person.password}
						placeholder='cannot be empty'
					/>
					<SelectInputField
						label='Occupation : '
						id='occupation'
						value={person.occupation}
						list={occupationList}
					/>
					<SelectInputField
						label='State : '
						id='state'
						value={person.state}
						list={stateList}
					/>
					<button className='submit-btn' type='submit' onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</section>
		</main>
	)
}

export default App
