const EC = require('elliptic').ec
const crypto = require('./crypto')
const {decryptWallet} = require('./wallet')

module.exports.signTransaction = (password, encryptedPrivateKey, recipient, transactionValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const wallet = await decryptWallet(password, encryptedPrivateKey)
      const transactionData = {
        from: wallet.address,
        to: recipient,
        senderPubKey: wallet.publicKey,
        value: transactionValue,
        fee: process.env.TRANSACTION_FEE,
        dateCreated: new Date()
      }
      const ec = new EC('secp256k1')
      const key = ec.genKeyPair()

      const shaMsg = await crypto.createHash(JSON.stringify(transactionData))
      const signature = key.sign(shaMsg, wallet.privateKey)
      const isValid = key.verify(shaMsg, signature, wallet.publicKey)
      if (isValid) {
        resolve(Object.assign({}, transactionData, { senderSignature: [signature.r.toJSON(), signature.s.toJSON()] }))
      } else {
        reject(new Error('Invalid transaction data'))
      }
    } catch (e) {
      reject(e)
    }
  })
}
