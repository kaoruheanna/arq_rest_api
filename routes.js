var route = require('./controllers');
var settings = require('./settings');

module.exports = function (app) {
	var successCB = function(res,data){
		var toSend = {
			success: true
		};
		if (data){
			toSend.data = data;
		}
		res.send(toSend);
	};

	var errorCB = function(res, error){
		res.send({
			success: false,
			error: error
		});
	};

    
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

    // respond with "hello world" when a GET request is made to the homepage
    app.get('/', function (req, res) {
        res.send('HOLA MUNDO!')
    })
};
