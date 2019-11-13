const bcrypt = require('bcrypt')
module.exports = {
	up: async (queryInterface, Sequelize) => {
		const password = await bcrypt.hash('password', 10)
		const timestamp = new Date()
		const timestamps = {
			created_at: timestamp,
			updated_at: timestamp,
		}

		await queryInterface.bulkInsert('users', [{
			username: 'hello',
			email: 'hello@user.com',
			password: password,
			...timestamps
		}, {
			username: 'world',
			email: 'world@user.com',
			password: password,
			...timestamps
		}, {
			username: 'third',
			email: 'third@user.com',
			password: password,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('follows', [{
			following_id: 1,
			follower_id: 2,
			...timestamps
		}, {
			following_id: 2,
			follower_id: 1,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('trumpets', [{
			type: 'PET',
			content: 'hello, world',
			link: 'https://sequelize.org',
			user_id: 1,
			published_at: timestamp,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('trumpets', [{
			type: 'PET',
			content: 'second pet',
			user_id: 2,
			prev_id: 1,
			published_at: timestamp,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('trumpets', [{
			type: 'TRUM',
			published_at: timestamp,
			user_id: 1,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('trumpets', [{
			type: 'PET',
			content: 'this is a draft',
			user_id: 1,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('trum_histories', [{
			trumpet_id: 3,
			title: 'Trum One',
			content: 'This is the content of Trum One',
			...timestamps
		}, {
			trumpet_id: 3,
			title: 'Trum One',
			content: 'This is the revised content of Trum One',
			created_at: new Date(),
			updated_at: new Date(),
		}], {})

		await queryInterface.bulkInsert('images', [{
			location: 'https://image.shutterstock.com/image-photo/view-himalayas-mountain-range-visible-600w-1317410681.jpg',
			trumpet_id: 1,
			...timestamps
		}, {
			location: 'https://farm1.staticflickr.com/2/2071854_f83b61578e_b.jpg',
			trumpet_id: 1,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('likes', [{
			user_id: 2,
			trumpet_id: 1,
			...timestamps
		}, {
			user_id: 3,
			trumpet_id: 1,
			...timestamps
		}, {
			user_id: 1,
			trumpet_id: 2,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('bookmarks', [{
			user_id: 1,
			trumpet_id: 2,
			...timestamps
		}], {})

		await queryInterface.bulkInsert('tags', [{
			name: 'new',
			...timestamps
		}, {
			name: 'trending',
			...timestamps
		}], {})

		return queryInterface.bulkInsert('trumpet_tags', [{
			tag_id: 1,
			trumpet_id: 1,
			...timestamps
		}, {
			tag_id: 2,
			trumpet_id: 1,
			...timestamps
		}], {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('trumpet_tags', null, {}),
		await queryInterface.bulkDelete('tags', null, {}),
		await queryInterface.bulkDelete('bookmarks', null, {}),
		await queryInterface.bulkDelete('likes', null, {}),
		await queryInterface.bulkDelete('images', null, {}),
		await queryInterface.bulkDelete('trum_histories', null, {}),
		await queryInterface.bulkDelete('trumpets', null, {}),
		await queryInterface.bulkDelete('follows', null, {}),
		await queryInterface.bulkDelete('users', null, {})
	}
}
