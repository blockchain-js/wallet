const EC = require('elliptic').ec
const Hashes = require('jshashes')
const crypto = require('./crypto')

module.exports.createWallet = (password) => {
  const ec = new EC('secp256k1')
  const keyPair = ec.genKeyPair()
  const publicKey = keyPair.getPublic().getX().toString(16) +
    (keyPair.getPublic().getY().isOdd() ? '1' : '0')
  const ripemd160 = new Hashes.RMD160()

  return {
    publicKey,
    privateKey: crypto.encrypt(keyPair.getPrivate().toString(16), password),
    address: ripemd160.hex(publicKey)
  }
}

module.exports.openWallet = (password, privateKey) => {
  const ec = new EC('secp256k1')
  const keyPair = ec.keyFromPrivate(crypto.decrypt(privateKey, password))
  const publicKey = keyPair.getPublic().getX().toString(16) +
    (keyPair.getPublic().getY().isOdd() ? '1' : '0')
  const ripemd160 = new Hashes.RMD160()

  return {
    publicKey,
    privateKey: crypto.encrypt(keyPair.getPrivate().toString(16), password),
    address: ripemd160.hex(publicKey)
  }
}
