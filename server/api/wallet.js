/*
 * Wallet API
 * Expose express REST endpoints
 */
'use strict'

// HTTP status codes
const status = require('http-status')
const { celebrate, Joi } = require('celebrate')
const utils = require('../utils/wallet')

module.exports = (app, options) => {
  app.post('/api/wallet',
    celebrate({
      body: Joi.object().keys({
        password: Joi.string().required()
      })
    }),
    async function (req, res, next) {
      try {
        res.status(status.OK).send({
          ok: true,
          wallet: utils.createWallet(req.body.password)
        })
      } catch (err) {
        next(err)
      }
    })

  app.put('/api/wallet',
    celebrate({
      body: Joi.object().keys({
        password: Joi.string().required(),
        privateKey: Joi.string().required()
      })
    }),
    async function (req, res, next) {
      try {
        res.status(status.OK).send({
          ok: true,
          wallet: utils.openWallet(req.body.password, req.body.privateKey)
        })
      } catch (err) {
        next(err)
      }
    })
}
