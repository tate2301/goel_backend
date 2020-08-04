import mysql = require('mysql');

class MySqlConnection  {
    connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host : '10.165.41.22',
            user : 'webserver',
            password : 'root',
            database : 'soterio'
        });
        this.setupConnection();
    }

    setupConnection() {
        this.connection.connect(err => {
            if(err) {
                console.log(err)
            } else {
                console.log("Database connected")
            }
        });
    }

    disconnect() {
        this.connection.end();
        this.connection.destroy();
    }
}

const d = new MySqlConnection()

export default MySqlConnection;
