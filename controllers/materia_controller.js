var async = require('async');

var list = function(models, callback){
    models.materia.findAll().then(materias => {
        var jsonList = materias.map(function(model) {
            var jsonElement = model.toJSON();
            return jsonElement;
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

var getCurso = function(cursoId, models, callback){
    async.waterfall([
        function(next){
            models.curso.findById(cursoId).then(curso => {
                next(null, curso)
            }, function(err){
                next('internal');
            });
        },
        function(curso, next){
            models.inscripcion.inscriptosInCurso(
                cursoId,
                function(inscriptos){
                    next(null,curso,inscriptos);
                },
                function(err){
                    next('internal');
                }
            );
        }
    ], function(err, curso, inscriptos){
        if (!err){
            var data = {
                curso: curso.toJSON(),
                inscriptos: inscriptos,
            };
            callback(err,data);
        }
    });
};

var desinscribir = function(inscripcionId, models, callback){
    models.inscripcion.desinscribir(
        inscripcionId,
        function(data){
            callback(null, data);
        },
        function(err){
            callback(err);
        }
    );
};

var candidatos = function(materiaId, models, callback){
    models.inscripcion.candidatosForMateria(
        materiaId,
        function(candidatos){
            var data = {
                candidatos: candidatos
            };
            callback(null, data);
        },
        function(err){
            callback(err);
        }
    );
};

var inscribir = function(cursoId, alumnoId, models, callback){
    models.inscripcion.inscribirAlumnoForCurso(
        cursoId,
        alumnoId,
        function(data){
            callback(null, data);
        },
        function(err){
            callback(err);
        }
    )
};

var calls = {
    list: list,
    listCursos: listCursos,
    getCurso: getCurso,
    desinscribir: desinscribir,
    candidatos: candidatos,
    inscribir: inscribir
}

module.exports = calls;