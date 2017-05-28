var async = require('async');

var list = function(models, callback){
    models.materia.findAll().then(materias => {
        var jsonList = materias.map(function(model) {
          return model.toJSON();
        });
        callback(null, jsonList);
    }, function(err){
        console.log("error list: "+err);
        callback('internal');
    });
}

var calls = {
    list: list
}

module.exports = calls;