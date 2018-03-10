const EC = require('elliptic').ec
const Hashes = require('jshashes')
const crypto = require('./crypto')

module.exports.createWallet = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ec = new EC('secp256k1')
      const keyPair = ec.genKeyPair()
      const publicKey = keyPair.getPublic().encode('hex')
      const ripemd160 = new Hashes.RMD160()
      const encryptedPrivateKey = await crypto.encrypt(keyPair.getPrivate().toString(16), password)

      resolve({
        publicKey,
        privateKey: encryptedPrivateKey,
        address: ripemd160.hex(publicKey)
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports.openWallet = (password, encryptedPrivateKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const wallet = await decryptWallet(password, encryptedPrivateKey)

      resolve({
        publicKey: wallet.publicKey,
        privateKey: encryptedPrivateKey,
        address: wallet.address
      })
    } catch (e) {
      reject(e)
    }
  })
}

const decryptWallet = module.exports.decryptWallet = (password, encryptedPrivateKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ec = new EC('secp256k1')
      const decryptedPrivateKey = await crypto.decrypt(encryptedPrivateKey, password)
      const keyPair = ec.keyFromPrivate(decryptedPrivateKey)
      const publicKey = keyPair.getPublic().encode('hex')
      const ripemd160 = new Hashes.RMD160()

      resolve({
        publicKey,
        privateKey: keyPair.getPrivate().toString(16),
        address: ripemd160.hex(publicKey)
      })
    } catch (e) {
      reject(e)
    }
  })
}
