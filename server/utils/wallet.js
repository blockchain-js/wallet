const EC = require('elliptic').ec
const Hashes = require('jshashes')
const crypto = require('./crypto')

module.exports.createWallet = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ec = new EC('secp256k1')
      const keyPair = ec.genKeyPair()
      const publicKey = keyPair.getPublic().getX().toString(16) +
        (keyPair.getPublic().getY().isOdd() ? '1' : '0')
      const ripemd160 = new Hashes.RMD160()
      const privateKey = await crypto.encrypt(keyPair.getPrivate().toString(16), password)

      resolve({
        publicKey,
        privateKey,
        address: ripemd160.hex(publicKey)
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports.openWallet = (password, privateKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ec = new EC('secp256k1')
      const encryptedPrivateKey = await crypto.decrypt(privateKey, password)
      const keyPair = ec.keyFromPrivate(encryptedPrivateKey)
      const publicKey = keyPair.getPublic().getX().toString(16) +
        (keyPair.getPublic().getY().isOdd() ? '1' : '0')
      const ripemd160 = new Hashes.RMD160()

      resolve({
        publicKey,
        privateKey,
        address: ripemd160.hex(publicKey)
      })
    } catch (e) {
      reject(e)
    }
  })
}
