'use strict'

const EventEmitter = require('events')
const joi = require('joi')

/**
 * @class
 *
 * @param {Object} options
 */
class Payworks extends EventEmitter {
  constructor (options) {
    super()
    options = options || {}
    this.user = options.user
    this.password = options.password
    this.merchant_id = options.merchant
    this.terminal_id = options.terminal
    this.default = {}
    this.user && (this.default.user = this.user)
    this.password && (this.default.password = this.password)
    this.merchant_id && (this.default.merchant_id = this.merchant_id)
    this.terminal_id && (this.default.terminal_id = this.terminal_id)
  }

  /**
   * Request for an authorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  auth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    return Payworks.request.call(this, 'AUTH', schema, params, options, callback)
  }

  /**
   * Request for a force authorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  forceAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    return Payworks.request.call(this, 'FORCED_AUTH', schema, params, options, callback)
  }

  /**
   * Request for a preauthorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  preAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    return Payworks.request.call(this, 'PREAUTH', schema, params, options, callback)
  }

  /**
   * Request for a postauthorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  postAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'POSTAUTH', schema, params, options, callback)
  }

  /**
   * Request for a reauthorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  reAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'REAUTH', schema, params, options, callback)
  }

  /**
   * Request for a refund
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  refund (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'REFUND', schema, params, options, callback)
  }

  /**
   * Request for a cancellation
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  cancel (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'VOID', schema, params, options, callback)
  }

  /**
   * Request for a reverse
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {string} params.control_number - Control Number
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  reverse (params, options, callback) {
    let schema = {
      reference: joi.string().required(),
      control_number: joi.string().max(30)
    }

    return Payworks.request.call(this, 'REVERSAL', schema, params, options, callback)
  }

  /**
   * Request for closing a transaction
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  close (params, options, callback) {
    let schema = {}

    return Payworks.request.call(this, 'MCHNT_SETTLEMENT', schema, params, options, callback)
  }

  /**
   * Request for closing a transaction group
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.group - Group
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  closeGroup (params, options, callback) {
    let schema = {
      group: joi.string().required()
    }

    return Payworks.request.call(this, 'GROUP_SETTLEMENT', schema, params, options, callback)
  }

  /**
   * Request for a transaction verification
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {string} params.control_number - Control Number
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  verify (params, options, callback) {
    let schema = {
      reference: joi.string(),
      control_number: joi.string()
    }

    return Payworks.request.call(this, 'VERIFY', schema, params, options, callback)
  }

  /**
   * Request for suspend a transaction
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  suspend (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'LOCK', schema, params, options, callback)
  }

  /**
   * Request for reactivate a transaction
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {(Object|Function|undefined)} options
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  reactivate (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'UNLOCK', schema, params, options, callback)
  }
}

/**
 * Helper function to make request to Payworks. Works with coroutines or events and promises.
 * Supports schema validation and emits events depending on response.
 *
 * @static
 * @method Payworks#request
 *
 * @param {Object} schema
 * @param {Object} params - Request params
 * @param {(Object|function|undefined)} options
 * @param {(function|undefined)} callback
 *
 * @return {PromiseEmitter}
 */
Payworks.request = require('./request')

module.exports = Payworks