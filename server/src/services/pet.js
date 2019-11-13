import db from '../models'
import UserService from './user'

const Trumpet = db.Trumpet
const Pet = Trumpet.scope('pet', 'published')

exports.getPets = async (query, page, limit) => {
	try {
		const offset = (page-1)*limit
		const pets = await Pet.findAll({
			where: query, 
			limit: limit, 
			offset: offset
		})
		return pets
	} catch (err) {
		console.log('Error in getPets')
		throw(err)
	}
}

exports.getDraftPets = async (userId, query, page, limit) => {
	try {
		const offset = (page-1)*limit
		const user = await UserService.getUser(userId)
		const pets = await user.getTrumpets({
			scope: ['pet', 'draft'],
			limit: limit,
			offset: offset
		})
		return pets
	} catch (err) {
		console.log('Error in getPets')
		throw(err)
	}
}

exports.createPet = async (userId, data) => {
	data['type'] = 'PET'
	data['UserId'] = userId
	data['publishedAt'] = new Date()
	console.log(data)
	try {
		await UserService.getUser(userId)
		const pet = await Trumpet.create(data)
		return pet
	} catch (err) {
		console.log('Error in createPet')
		throw(err)
	}
}

exports.toggleLikePet = async (userId, id, state) => {
	try {
		const pet = await Pet.findByPk(id)
		if (!pet) {
			throw Error('Not found')
		}
		const user = await UserService.getUser(userId)
		if (state) {
			await pet.addLikedBy(user)
		} else {
			await pet.removeLikedBy(user)
		}
		return await pet.reload()
	} catch (err) {
		console.log('Error in toggleLikePet')
		throw(err)
	}
}

exports.toggleBookmarkPet = async (userId, id, state) => {
	try {
		const pet = await Pet.findByPk(id)
		if (!pet) {
			throw Error('Not found')
		}
		const user = await UserService.getUser(userId)
		if (state) {
			await pet.addBookmarkedBy(user)
		} else {
			await pet.removeBookmarkedBy(user)
		}
		return await pet.reload()
	} catch (err) {
		console.log('Error in toggleBookmarkPet')
		throw(err)
	}
}
