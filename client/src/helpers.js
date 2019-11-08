export const fetchData = (url, method='GET', body={}, headers={}) => {
	return fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...headers
		}
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
			throw err
		})
}