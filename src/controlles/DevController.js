const axios = require('axios')
const DevModel = require('../models/DevModel')

module.exports = {
    async index(req, res) {
        const { user } = req.headers
        if (user) {
            const loggerdDev = await DevModel.findById(user)
            if (loggerdDev) {
                /* $ne = not equal */
                /* $nin = not in */
                const users = await DevModel.find({
                    $and: [
                        { _id: { $ne: user } },
                        { _id: { $nin: loggerdDev.likes } },
                        { _id: { $nin: loggerdDev.dislikes } },
                    ]
                })
                return res.json(users)
            } else {
                return res.status(400).json({
                    error: `req.headers.user not found. It's required!`,
                    dateTime: new Date(),
                })
            }
        } else {
            return res.status(400).json({
                error: `req.headers.user required!`,
                dateTime: new Date(),
            })
        }
    },

    async store(req, res) {
        const { username } = req.body
        const userExists = await DevModel.findOne({ user: username })

        if (userExists) {
            return res.json(userExists)
        } else {
            const resp = await axios.get(`https://api.github.com/users/${username}`)
            const { name, bio, avatar_url: avatar } = resp.data
            const devObj = await DevModel.create({ name: name ? name : username, user: username, bio, avatar })

            return res.json(devObj)
        }
    },

    test(req, res) {
        const dateTime = new Date()
        const { user, key } = req.headers
        if (user === 'kaichiro' && key === 'abc123def456') {
            return res.json({ statusTest: 'Ok!', dateTime, user, key })
        } else {
            return res.json({ message: `User or key aren't valid!`, dateTime })
        }
    },

    home(req, res) {
        return res.json({ status: 'API is running!', dataTime: new Date() })
    }
}
