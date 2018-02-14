/*
 * Config
 * Configure Next.js
 */
const next = require('next')

module.exports = () => {
  const dev = process.env.NODE_ENV !== 'production'
  return next({ dev })
}
