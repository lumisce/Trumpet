export const mapErrors = (errors) => {
	const compactErrors = {}
	errors.forEach(err => {
		compactErrors[err.path] = err.message
	})
	return compactErrors
}
