// Load env vars
require('dotenv').config()

const { EventEmitter } = require('events')
const events = new EventEmitter()
const server = require('./server')
const error = require('./server/utils/error')
const config = require('./server/config')

// Error handling - on unhandled promise rejection
process.on('unhandledRejection', function (reason, p) {
  // Will be handled by uncaughtException err handler
  error.handle(reason)
})

// Error handling - on uncaught exception
process.on('uncaughtException', async function (err) {
  error.handle(err)
  // Stop the process and exit
  process.exit(1)
})

async function start () {
  try {
    const next = config.next()

    // Prepare Next.js
    await next.prepare()

    // Start server
    const app = await server.start({
      port: 3000,
      next
    })

    // Server is ready
    events.emit('server:ready', { app, next })
  } catch (err) {
    error.handle(err)
  }
}

// Start the server
start()

module.exports = { events }
