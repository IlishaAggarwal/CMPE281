mysql = require('mysql');
var db;

function dbConnectionProvider() {
    if (!db) {
        db = mysql.createPool({
            connectionLimit: 10,
            host: "robocloud.coj2wm12re7c.us-east-2.rds.amazonaws.com",
            port: 3306,
            user: "admin",
            password: "admin1234",
            database: "robocloud"
        });
    }
    return db;

}
module.exports = dbConnectionProvider();