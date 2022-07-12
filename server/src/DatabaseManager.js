const sqlite3 = require('sqlite3').verbose()

module.exports = class DatabaseManager {

    db

    constructor()
    {
        this.db = new sqlite3.Database("../database.sqlite3", (err) =>
        {
            if (err)
            {
                console.error(err.message)
            }

            console.log('Connected to the database')
        })
    }
}