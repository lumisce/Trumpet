import { query, body, validationResult } from 'express-validator'

export const getUsersValidation = () => {
	return [
		query('page').optional().isInt().toInt(),
		query('limit').optional().isInt().toInt()
	]
}

export const createUserValidation = () => {
	return [
		body('username').isLength({min: 3, max: 32}),
		body('email').isEmail(),
		body('password').isLength({min: 8, max: 40}),
		body('passwordConfirmation').exists()
			.custom((value, {req}) => value === req.body.password)
	]
}

export const validate = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}

	const compactErrors = {}
	errors.array().map(err => 
		compactErrors[err.param] = err.msg
	)

	return res.status(422).json({
		errors: compactErrors
	})
}