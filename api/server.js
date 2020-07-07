const express = require("express");
const cors = require('cors')
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors())


server.get('/', (req, res) => {
    res.status(200).json({
       message: `Welcome to ${process.env.COHORT}`
    })
  });

function find(query = {}) {
	const { limit = 100, sortBy = "id", sortDir = "asc" } = query

	return db("accounts")
		.orderBy(sortBy, sortDir)
		.limit(limit)
		.select()
}

server.get('/accounts', async (req, res, next) => {
    try {
		const accounts = await find({
            limit: req.query.limit,
            sortBy: req.query.sortBy,
            sortDir: req.query.sortDir
        })

		res.json(accounts)
	} catch (err) {
		next(err)
	}
})

server.get('/accounts/:id', async (req, res, next) => {
    try {
        const [account] = await db.select("*")
                                  .from("accounts")
                                  .where("id", req.params.id)
                                  .limit (1)

		res.json(account)
	} catch (err) {
		next(err)
	}
})

server.post('/accounts', async (req, res, next) => {
    try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
        }
        
		const [accountId] = await db.insert(payload).into("accounts")
		const account = await db.first("*").from("accounts").where("id", accountId)

		res.status(201).json(account)
	} catch (err) {
		next(err)
	}
})

server.put('/accounts/:id', async (req, res, next) => {
    try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
        }
        
		await db("accounts").update(payload).where("id", req.params.id)
		const account = await db.first("*").from("accounts").where("id", req.params.id)

		res.json(account)
	} catch (err) {
		next(err)
	}
})

server.delete('/accounts/:id', async (req, res, next) => {
    try {
		await db("accounts").where("id", req.params.id).delete()

		res.status(202).json({
            message:'the account has been removed'
        })
	} catch (err) {
		next(err)
	}
})


module.exports = server;
