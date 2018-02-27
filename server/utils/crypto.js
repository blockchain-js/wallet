const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const salt = process.env.SALT

module.exports.encrypt = (clearText, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(err)
      }
      try {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(algorithm, derivedKey, iv)
        let encrypted = cipher.update(clearText, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        resolve(iv.toString('hex') + ':' + encrypted.toString())
      } catch (e) {
        reject(e)
      }
    })
  })
}

module.exports.decrypt = (text, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(err)
      }
      try {
        const encryptedArray = text.split(':')
        const iv = Buffer.from(encryptedArray[0], 'hex')
        const encrypted = Buffer.from(encryptedArray[1], 'hex')
        const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv)
        let decrypted = decipher.update(encrypted, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        resolve(decrypted)
      } catch (e) {
        reject(e)
      }
    })
  })
}
