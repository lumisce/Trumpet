import { query, body, validationResult } from 'express-validator'

export const getUsersValidation = () => {
	return [
		query('page').optional().isInt().toInt(),
		query('limit').optional().isInt().toInt()
	]
}

export const createUserValidation = () => {
	return [
		body('username').isLength({min: 3, max: 32})
			.withMessage('3-32 characters required'),
		body('email').isEmail().withMessage('Valid email required'),
		body('password').isLength({min: 8, max: 40})
			.withMessage('8-40 characters required'),
		body('passwordConfirmation').not().isEmpty()
			.withMessage('Required')
			.custom((value, {req}) => value === req.body.password)
			.withMessage('Must match password')
	]
}

export const loginValidation = () => {
	return [
		body('email').isEmail(),
		body('password').exists()
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