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
            error: 'internal'
        };
        var xml = builder.buildObject(obj);
        res.send(xml);
	};

    app.post('/', function (req, res) {
        var body = req.body.envelope.body;
        console.log("body:",body);
        if (body.hasOwnProperty('materiasList')){
            processMateriasList(req.models, res);
        } else {
            res.send('Hola Mundo');    
        }
        
        
        /*
        var obj = {name: req.body.body.nombre, Surname: req.body.body.apellido};
        var xml = builder.buildObject(obj);
        res.send(xml);
        */
    })

    var processMateriasList = function(models, res){
        route.materia.list(models, function(err,data){
            if (err){
                errorCB(res, err);
            } else {
                successCB(res,data);
            }
        });
    }
    /*
    // devuelve los alumnos candidatos a inscripcion
    app.get('/materia/:materiaId/curso/:cursoId/inscripcion', function(req,res){
    	route.materia.candidatos(req.params.materiaId, req.params.cursoId, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });

    app.delete('/materia/:parentId/curso/:cursoId/inscripcion/:inscripcionId', function(req,res){
        route.materia.desinscribir(req.params.inscripcionId, req.models, function(err,data){
            if (err){
                errorCB(res, err);
            } else {
                successCB(res,data);
            }
        });
    });

    app.post('/materia/:materiaId/curso/:cursoId/inscripcion', function(req,res){
    	route.materia.inscribir(req.params.cursoId, req.body.alumnoId, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });

    app.get('/materia/:parentId/curso/:id', function(req,res){
    	route.materia.getCurso(req.params.id, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
                successCB(res,data);
    		}
    	});
    });

    //app.get('/materia/:id/curso', function(req,res){
    app.get('/materia/:id', function(req,res){
    	route.materia.listCursos(req.params.id, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });
       
    app.get('/materia', function (req, res) {
    	route.materia.list(req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
	});
    */
};
