const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (_, res) => {
  res.json(
    { status: 'ok', data: 'something useful here' }
  )
})

module.exports = server
