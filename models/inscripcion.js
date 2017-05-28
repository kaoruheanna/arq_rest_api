module.exports = function (Sequelize, sequelize, models) {
	var Inscripcion = sequelize.define('inscripcion', {
		alumnoId: {
	    	type: Sequelize.INTEGER,
	    	field: 'alumno_id',
	    	primaryKey: true,
	    	allowNull: false,
	  	},
		cursoId: {
	    	type: Sequelize.INTEGER,
	    	field: 'curso_id',
	    	primaryKey: true,
	    	allowNull: false,
	  	},
	}, {
		tableName: 'inscripciones',
		id: ['entidadId','activoId'],
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
	          return model.alumno.toJSON();
	        });
	        successCB(jsonList);
	    }, function(err){
	        errorCB('internal');
	    });
	};

	Inscripcion.desinscribir = function(cursoId, alumnoId, successCB, errorCB){
		Inscripcion.destroy({
			where: {
				cursoId: cursoId,
				alumnoId: alumnoId
			}
		}).then(inscripciones => {
	        console.log("success!!!!");
	        successCB();
	    }, function(err){
	        errorCB('internal');
	    });
	};
	

	models.inscripcion = Inscripcion;
};