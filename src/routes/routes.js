const express = require('express')
const DevController = require('../controlles/DevController')
const LikeController = require('../controlles/LikeController')
const DislikeController = require('../controlles/DislikeController')

const routes = express.Router()

routes.get('/', DevController.home)
routes.get('/test', DevController.test)
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.post(`/devs/:devId/likes`, LikeController.store)
routes.post(`/devs/:devId/dislikes`, DislikeController.store)

module.exports = routes
