const db = require('../data/dbConfig')


module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find(query = {}) {
	const { limit = 100, sortBy = "id", sortDir = "asc" } = query

	return db("accounts")
		.orderBy(sortBy, sortDir)
		.limit(limit)
		.select()
}

function findById(id) {
    return db('accounts')
    .where("id", id)
    .first()
}

function add(account) {
    return db('accounts')
    .insert(account, 'id')
    .then(ids => {
        return findById(ids[0])
    })
}

function update(id, change) {
    return db('accounts')
    .where('id', id)
    .update(change)
    .then(() => {
        return findById(id)
    })
}

function remove(id) {
    return db('accounts')
    .where('id', id)
    .del()
}