const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

exports.hash = async function hash(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashed = await bcrypt.hash(password, salt)
    return hashed
}

exports.compare = async function compare(password, hashed) {
    const match = await bcrypt.compare(password, hashed)
    return match
}
