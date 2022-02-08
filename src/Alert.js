import React, { useEffect } from 'react'
import { useGlobalContext } from './FormContext'

const Alert = ({ msg, type }) => {
	const { showAlert } = useGlobalContext()
	useEffect(() => {
		const timeout = setTimeout(() => {
			showAlert()
		}, 1700)
		return () => clearTimeout(timeout)
	})

	return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
