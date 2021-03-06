var async = require('async');

var list = function(models, callback){
    models.materia.findAll().then(materias => {
        var jsonList = materias.map(function(model) {
            var jsonElement = model.toJSON();
            jsonElement.link = '/materia/'+jsonElement.id;
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
            data.forEach(function(item){
                item.link = '/materia/'+materiaId+'/curso/'+item.id;
            });
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
            inscriptos.forEach(function(item){
                item.remove = '/materia/'+curso.materiaId+'/curso/'+curso.id+'/inscripcion/'+item.id;
            });
            var data = {
                curso: curso.toJSON(),
                inscriptos: inscriptos,
                link: '/materia/'+curso.materiaId+'/curso/'+curso.id+'/inscripcion'
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

var candidatos = function(materiaId,cursoId, models, callback){
    models.inscripcion.candidatosForMateria(
        materiaId,
        function(candidatos){
            var data = {
                candidatos: candidatos,
                add: '/materia/'+materiaId+'/curso/'+cursoId+'/inscripcion'
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