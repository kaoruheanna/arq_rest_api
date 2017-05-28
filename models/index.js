var settings = require('../settings');
var Sequelize = require('sequelize');

function loadDatabase() {
    console.log('Loading database...');
    // Create db connection
    var models = {};
    var sequelize = new Sequelize(
        settings.sequelize.database, 
        settings.sequelize.user, 
        settings.sequelize.password, 
        {
            host: settings.sequelize.host,
            dialect: settings.sequelize.dialect,
            define: {
                timestamps: false,
            },
            storage: settings.sequelize.storage
        }
    );

    require('./alumno')(Sequelize, sequelize, models);
    require('./materia')(Sequelize, sequelize, models);
    require('./curso')(Sequelize, sequelize, models);
  
    return {
        db: sequelize,
        models: models
    };
}

module.exports = {
    init: loadDatabase
};
