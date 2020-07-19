require('dotenv').config()

module.exports = {
    env: (key, def) => {
        return process.env[key] || def;
    }
}