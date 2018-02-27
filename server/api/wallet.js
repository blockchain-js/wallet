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
  app.post('/api/wallet/create',
    celebrate({
      body: Joi.object().keys({
        password: Joi.string().required()
      })
    }),
    async function (req, res, next) {
      try {
        const wallet = await utils.createWallet(req.body.password)
        res.status(status.CREATED).send({
          wallet
        })
      } catch (err) {
        next(err)
      }
    })

  app.post('/api/wallet/open',
    celebrate({
      body: Joi.object().keys({
        password: Joi.string().required(),
        privateKey: Joi.string().required()
      })
    }),
    async function (req, res, next) {
      try {
        const wallet = await utils.openWallet(req.body.password, req.body.privateKey)
        res.status(status.OK).send({
          wallet
        })
      } catch (err) {
        next(err)
      }
    })
}
