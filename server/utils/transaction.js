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
        dateCreated: new Date().getTime()
      }
      const ec = new EC('secp256k1')
      const privateKey = ec.keyFromPrivate(wallet.privateKey, 'hex')

      const shaMsg = await crypto.createHash(JSON.stringify(transactionData))
      const signature = ec.sign(shaMsg, privateKey)
      const publicKey = ec.keyFromPublic(wallet.publicKey, 'hex')
      const isValid = publicKey.verify(shaMsg, signature)
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
