import React from 'react'
import { useGlobalContext } from './FormContext'

const TextInputField = ({ label, type, id, value, placeholder, pattern }) => {
	const { handleChange } = useGlobalContext()

	return (
		<div className='form-control'>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				name={id}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				pattern={pattern}
				required
			/>
		</div>
	)
}

export default TextInputField
