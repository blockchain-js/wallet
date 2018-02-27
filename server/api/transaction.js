/*
 * Transaction API
 * Expose express REST endpoints
 */
'use strict'

// HTTP status codes
const status = require('http-status')
const { celebrate, Joi } = require('celebrate')
const transactionUtils = require('../utils/transaction')

module.exports = (app, options) => {
  app.post('/api/transaction/sign',
    celebrate({
      body: Joi.object().keys({
        password: Joi.string().required(),
        privateKey: Joi.string().required(),
        recipient: Joi.string().required(),
        transactionValue: Joi.string().required()
      })
    }),
    async function (req, res, next) {
      try {
        const {password, privateKey, recipient, transactionValue} = req.body
        const signature = await transactionUtils.signTransaction(password, privateKey, recipient, transactionValue)
        res.status(status.CREATED).send({
          signature
        })
      } catch (err) {
        next(err)
      }
    })
}
