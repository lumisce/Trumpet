export const fetchData = (url, method='GET', bodyObj={}, headers={}) => {
	const body = method === 'GET' || { body: JSON.stringify(bodyObj) }
	return fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...headers
		},
		...body
	}).then(resp => {
		if (!resp.ok) {
			let err = new Error('Error '+resp.status)
			err.response = resp
			err.status = resp.status
			throw err
		}
		return resp
	}).then(resp => resp.json())
		.catch(async (err) => {
			if (err.status >= 500) {
				console.log('Something went wrong')
				return
			}
			console.log(err)
			throw err
		})
}