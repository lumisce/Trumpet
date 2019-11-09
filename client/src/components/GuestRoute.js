import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

const GuestRoute = ({children, authenticated, verifyUser, ...rest}) => {
	useEffect(() => {
		verifyUser()
	}, [])

	return (
		<Route
			render={() => authenticated ? <Redirect to='/'/> : children}
			{...rest}
		/>
	)
}

export default GuestRoute
