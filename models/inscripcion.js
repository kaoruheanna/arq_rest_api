var async = require('async');

module.exports = function (Sequelize, sequelize, models) {
	var Inscripcion = sequelize.define('inscripcion', {
		alumnoId: {
	    	type: Sequelize.INTEGER,
	    	field: 'alumno_id',
	    	allowNull: false,
	  	},
		cursoId: {
	    	type: Sequelize.INTEGER,
	    	field: 'curso_id',
	    	allowNull: false,
	  	},
	}, {
		tableName: 'inscripciones',
		name: {
      		singular: 'inscripcion',
	      	plural: 'inscripciones',
	    },
		instanceMethods: {
			serialize: function () {
				return this;
			}
		},
	});

	Inscripcion.belongsTo(models.alumno, { foreignKey: { name: 'alumnoId', field: 'alumno_id', allowNull: false } }); 
	models.alumno.hasMany(Inscripcion, { foreignKey: { name: 'alumnoId', field: 'alumno_id', allowNull: false } });

	Inscripcion.belongsTo(models.curso, { foreignKey: { name: 'cursoId', field: 'curso_id', allowNull: false } }); 
	models.curso.hasMany(Inscripcion, { foreignKey: { name: 'cursoId', field: 'curso_id', allowNull: false } });

	Inscripcion.inscriptosInCurso = function(cursoId, successCB, errorCB){
		Inscripcion.findAll({
			where: {
				cursoId: cursoId	
			},
			include: [ {model: models.alumno }]
		}).then(inscripciones => {
	        var jsonList = inscripciones.map(function(model) {
	          return model.toJSON();
	        });
	        successCB(jsonList);
	    }, function(err){
	        errorCB('internal');
	    });
	};

	Inscripcion.desinscribir = function(inscripcionId, successCB, errorCB){
		Inscripcion.destroy({
			where: {
				id: inscripcionId
			}
		}).then(inscripciones => {
	        console.log("success!!!!");
	        successCB(inscripcionId);
	    }, function(err){
	        errorCB('internal');
	    });
	};

	Inscripcion.candidatosForMateria = function(materiaId, successCB, errorCB){
		models.alumno.findAll({
			include: [ 
				{
					model: Inscripcion,
					required: false,
					include: [
						{ 
							model: models.curso,
							required: false,
						}
					]
				}
			]
		}).then(alumnos => {
	        var jsonList = [];
	        alumnos.forEach(function(alumno){
	        	if (!alumno.inscriptoInMateria(materiaId)){
	        		jsonList.push({
	        			id: alumno.id,
	        			padron: alumno.padron,
	        			apellido: alumno.apellido,
	        			nombres: alumno.nombres
	        		});
	        	}
	        });
	        successCB(jsonList);
	    }, function(err){
	        errorCB('internal');
	    });
	};

	Inscripcion.inscribirAlumnoForCurso = function(cursoId, alumnoId, successCB, errorCB){
		async.waterfall([
	        function(callback){
	            models.curso.findById(cursoId).then(curso => {
	                callback(null, curso)
	            }, function(err){
	                callback('internal');
	            });
	        },
	        function(curso, callback){
	        	Inscripcion.findAll({
	        		where: {
	        			alumnoId: alumnoId
	        		},
	        		include: [ {model: models.curso }]
	        	}).then(inscripciones => {
	        		var error = null;
	        		if (inscripciones && inscripciones.length){
	        			inscripciones.forEach(function(item){
	        				if (item.curso.materiaId == curso.materiaId){
	        					error = 'materia-repetida';
	        				}
	        			});
	        		}
	        		callback(error);
				}, function(err){
        			callback('internal');
    			});
	        },
	        function(callback){
	        	Inscripcion.create({ cursoId: cursoId, alumnoId: alumnoId }).then(inscripcion => {
					callback(null,inscripcion.toJSON());  
				}, function(err){
					callback('internal');
				});
	        }
	    ], function(err,data){
	    	if (!err){
	    		successCB(data);  
			} else {
				errorCB(err);
			};
	    });
	};

	models.inscripcion = Inscripcion;
};