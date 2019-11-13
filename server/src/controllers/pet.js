import { mapErrors } from '../common/helpers'
import PetService from '../services/pet'

exports.getPets = async (req, res, next) => {
	let {page, limit, ...query} = req.query
	page = req.query.page ? req.query.page : 1
	limit = req.query.limit ? req.query.limit : 10

	try {
		const pets = await PetService.getPets(query, page, limit)
		return res.status(200).json({
			status: 200,
			data: pets,
			message: 'Pets Retrieved'
		})
	} catch (err) {
		next(err)
	}
}

exports.createPet = async (req, res, next) => {
	try {
		const pet = await PetService.createPet(req.user.id, req.body)
		return res.status(200).json({
			status: 200,
			data: pet,
			message: 'Pet Created'
		})
	} catch (err) {
		if (err.errors) {
			return res.status(422).json({
				errors: mapErrors(err.errors),
			})
		}
		next(err)
	}
}

exports.interactPet = async (req, res, next) => {
	try {
		let message = ''
		let pet = null
		if (req.path === '/like') {
			pet = await PetService.toggleLikePet(
				req.user.id, req.body.id, req.body.state)
			message = 'Pet Like = '+req.body.state
		} else if (req.path === '/bookmark') {
			pet = await PetService.toggleBookmarkPet(
				req.user.id, req.body.id, req.body.state)
			message = 'Pet Bookmark = '+req.body.state
		}
		return res.status(200).json({
			status: 200,
			data: pet,
			message: message
		})
	} catch (err) {
		if (err.errors) {
			return res.status(422).json({
				errors: mapErrors(err.errors),
			})
		}
		let code = 500
		switch (err.message) {
			case 'Not found':
				code = 404
				break
			case 'No user':
				code = 403
				break
			default:
				next(err)
		}
		return res.status(code).json({
			status: code,
			message: err.message
		})
	}
}

exports.getDraftPets = async (req, res, next) => {
	let {page, limit, ...query} = req.query
	page = req.query.page ? req.query.page : 1
	limit = req.query.limit ? req.query.limit : 10

	try {
		const pets = await PetService.getDraftPets(req.user.id, query, page, limit)
		return res.status(200).json({
			status: 200,
			data: pets,
			message: 'Draft Pets Retrieved'
		})
	} catch (err) {
		let code = 500
		switch (err.message) {
			case 'No user':
				code = 403
				break
			default:
				next(err)
		}
		return res.status(code).json({
			status: code,
			message: err.message
		})
	}
}
