var async = require('async');

var list = function(models, callback){
    models.alumno.findAll().then(alumnos => {
        var jsonList = alumnos.map(function(model) {
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