/*
 * Server
 * Express server init settings and apis initialization
 */
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const status = require('http-status')

const walletAPI = require('./api/wallet')
const error = require('./utils/error')

const start = (options) => {
  return new Promise((resolve, reject) => {
    // Check if Next.js instance is set in option
    if (!options.next) {
      reject(new Error('server: [options] no Next.js instance specified'))
    }
    // Check if port is set in options
    if (!options.port) {
      reject(new Error('server: [options] no port specified'))
    }

    // Create express server
    const app = express()
    const handle = options.next.getRequestHandler()

    // Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // Parse application/json
    app.use(bodyParser.json())

    // Help secure the app with various HTTP headers
    app.use(helmet())

    // Add wallet api to the express app
    walletAPI(app, options)

    // Handle the route through Next.js
    app.get('*', handle)

    // Express error handling
    app.use((err, req, res, next) => {
      // Log the error
      error.handle(err)
      // Notify the client
      res.sendStatus(status.INTERNAL_SERVER_ERROR)
    })

    // Start the server and return the instance
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = { start }
