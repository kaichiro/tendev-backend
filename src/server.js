const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes/routes')

const server = express()
const port = process.env.PORT || 3333

const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
const dbUser = process.env.DB_USER
const dbCluster = process.env.DB_CLUSTER

const dbCntStr =
    `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}-mkbtw.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(dbCntStr, { useNewUrlParser: true, })

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
