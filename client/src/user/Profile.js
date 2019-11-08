import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const Profile = () => {
	const match = useRouteMatch('/u/:username')
	return (
		<div>{match.params.username}</div>
	)
}

export default Profile
