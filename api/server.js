const express = require("express");
const cors = require('cors')
const data = require("./helper");

const server = express();

server.use(express.json());
server.use(cors())


server.get('/', (req, res) => {
    res.status(200).json({
       message: `Welcome to ${process.env.COHORT}`
    })
  });



server.get('/accounts', async (req, res, next) => {
    try {
		const accounts = await data.find({
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
        const account = await data.findById(req.params.id)
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
		const account = await data.add(payload)
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
        
		const account = await data.update(req.params.id, payload)
		res.json(account)
	} catch (err) {
		next(err)
	}
})

server.delete('/accounts/:id', async (req, res, next) => {
    try {
		await data.remove(req.params.id)
		res.status(202).json({
            message:'the account has been removed'
        })
	} catch (err) {
		next(err)
	}
})


module.exports = server;
