var route = require('./controllers');
var settings = require('./settings');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();

module.exports = function (app) {
	
    var successCB = function(res,data){
		var toSend = {
			success: true
		};
		if (data){
			toSend.data = data;
		}
		var xml = builder.buildObject(toSend);
        res.send(xml);
	};

	var errorCB = function(res, error){
        var obj = {
            success: false,
            error: error
        };
        var xml = builder.buildObject(obj);
        res.send(xml);
	};

    app.post('/', function (req, res) {
        var body = req.body.envelope.body;
        if (body.hasOwnProperty('materiasList')){
            materiasList(req.models, res);

        } else if (body.hasOwnProperty('cursosList')){
            cursosList(body.cursosList, req.models, res);

        } else if (body.hasOwnProperty('getCurso')){
            getCurso(body.getCurso, req.models, res);

        } else if (body.hasOwnProperty('getCandidatos')){
            getCandidatosForMateria(body.getCandidatos, req.models, res);

        } else if (body.hasOwnProperty('desinscribir')){
            desinscribir(body.desinscribir, req.models, res);

        } else if (body.hasOwnProperty('inscribir')){
            inscribir(body.inscribir, req.models, res);

        } else {
            res.send('Hola Mundo');    
        }
    })

    var materiasList = function(models, res){
        route.materia.list(models, function(err,data){
            if (err){
                errorCB(res, err);
            } else {
                successCB(res,data);
            }
        });
    }

    var cursosList = function(args, models, res){
        route.materia.listCursos(args.materiaId, models, function(err,data){
            if (err){
                errorCB(res, err);
            } else {
                successCB(res,data);
            }
        });
    };

    var getCurso = function(args, models, res){
        route.materia.getCurso(args.cursoId, models, function(err,data){
            if (err){
                errorCB(res, err);
            } else {
                successCB(res,data);
            }
        });
    };

    // devuelve los alumnos candidatos a inscripcion
    var getCandidatosForMateria = function(args, models, res){
        if (!args.materiaId){
            errorCB(res,'missing-args');
        } else {
            route.materia.candidatos(args.materiaId, models, function(err,data){
                if (err){
                    errorCB(res, err);
                } else {
                    successCB(res,data);
                }
            });    
        }
        
    };

    var desinscribir = function(args, models, res){
        route.materia.desinscribir(args.inscripcionId, models, function(err,data){
            if (err){
                errorCB(res, err);
            } else {
                successCB(res,data);
            }
        });
    };
    
    var inscribir = function(args, models, res){
    	route.materia.inscribir(args.cursoId, args.alumnoId, models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    };

};
