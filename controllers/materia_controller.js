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

var alumnosInscriptos = function(cursoId, models, callback){
    models.inscripcion.inscriptosInCurso(
        cursoId,
        function(data){
            callback(null, data);
        },
        function(err){
            callback(err);
        }
    );
};

var desinscribir = function(cursoId, alumnoId, models, callback){
    models.inscripcion.desinscribir(
        cursoId,
        alumnoId,
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
        function(data){
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
    alumnosInscriptos: alumnosInscriptos,
    desinscribir: desinscribir,
    candidatos: candidatos,
    inscribir: inscribir
}

module.exports = calls;