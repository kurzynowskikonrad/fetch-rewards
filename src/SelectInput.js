import React from 'react'
import { useGlobalContext } from './FormContext'

const SelectInputField = ({ label, id, value, list }) => {
	const { handleChange } = useGlobalContext()

	return (
		<div className='form-control'>
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				name={id}
				onChange={handleChange}
				value={value}
				className={value ? '' : 'highlight'}
				required
			>
				{list.length === 0 && <option>Error: No {id}s found.</option>}
				{list.length > 0 && value === '' && (
					<option>
						Select {id === 'state' ? 'a' : 'an'} {id}.
					</option>
				)}
				{list.map((item, i) => {
					/* return (
						<option key={i} value={item}>
							{item}
						</option>
					) */
					if (typeof item === 'string') {
						return (
							<option key={i} value={item}>
								{item}
							</option>
						)
					} else {
						return (
							<option key={i} value={item.name}>
								{item.name}
							</option>
						)
					}
				})}
			</select>
		</div>
	)
}

export default SelectInputField
