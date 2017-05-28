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
};

var listCursos = function(materiaId, models, callback){
    models.curso.listForMateria(
        materiaId,
        function(data){
            callback(null, data);
        },
        function(err){
            callback(err);
        }
    );
};

var calls = {
    list: list,
    listCursos: listCursos
}

module.exports = calls;