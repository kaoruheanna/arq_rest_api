var path       = require('path');

module.exports = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : 9000,
    sequelize  : {
        dialect  : "sqlite",
        host     : "localhost",
        database : "database", 
        user     : "username", 
        password : "password",
        debug    : true,
        storage  : 'database.db'
    },
    appUrl: 'http://localhost:3333/',
};
