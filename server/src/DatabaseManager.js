const fs = require('fs')

module.exports = class DatabaseManager {

    static db

    static init() {
        try {
            DatabaseManager.db = JSON.parse(fs.readFileSync('./database.json', 'utf8'))
        }
        catch (error) {
            DatabaseManager.reset()
            DatabaseManager.save()
        }
    }

    static save() {
        fs.writeFileSync('./database.json', JSON.stringify(this.db, null, 2))
        DatabaseManager.init()
    }

    static reset() {
        DatabaseManager.db = {
            whatsappGroup: "",
            telegramGroup: "",
            discordServer: "",
            discordChannel: ""
        }

        this.save()
    }

    static set(key, value) {
        DatabaseManager.db[key] = value
        DatabaseManager.save()
    }

    static get(key) {
        return DatabaseManager.db[key]
    }
}