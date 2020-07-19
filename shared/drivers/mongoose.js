const mongoose = require('mongoose');

class MongooseDriver {
    constructor({ host, port, user, password, db, disable_auth }) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.disable_auth = disable_auth;
        this.db = db;
    }

    async connect() {
        try {
            if (this.disable_auth)
                return await mongoose.connect(`mongodb://${this.host}:${this.port}/${this.db}`);

            return await mongoose.connect(`mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.db}`);
        }
        catch (e) {
            console.error("connect -> e", e)
            throw new Error(`Can't connect to DB ${this.db} using credentials ${{ ...this }}`);
        }
    }
}

module.exports = MongooseDriver