const DevModel = require('../models/DevModel')

module.exports = {
    async store(req, res) {
        const { user } = req.headers
        const { devId } = req.params

        const loggedDev = await DevModel.findById(user)
        const targetDev = await DevModel.findById(devId)

        if (user === devId) {
            return res.json({
                status: `Devs need be different!`,
                dateTime: new Date(),
            })
        }

        if (!targetDev) {
            return res.status(400).json({
                error: `Dev not exists!`,
                dateTime: new Date(),
            })
        }

        if (loggedDev.dislikes.includes(targetDev._id)) {
            return res.json({
                status: `Já houve dislike!`,
                dateTime: new Date(),
            })
        }

        loggedDev.dislikes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev)
    }
}