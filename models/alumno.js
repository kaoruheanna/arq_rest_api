module.exports = function (Sequelize, sequelize, models) {
	var Alumno = sequelize.define('alumno', {
		apellido: {
	    	type: Sequelize.STRING(255),
	    	allowNull: false,
	  	},
	  	nombres: {
	    	type: Sequelize.STRING(255),
	    	allowNull: false,
	  	},
		padron: {
	    	type: Sequelize.BIGINT,
	    	allowNull: false,
	    	unique: true
	  	}
	}, {
		tableName: 'alumnos',
		instanceMethods: {
			serialize: function () {
				return this;
			},
			inscriptoInMateria: function(materiaId){
				if (!this.inscripciones){
					return false;
				}
				for (var i = 0; i < this.inscripciones.length; i++){
					var inscripcion = this.inscripciones[i];
					if (inscripcion.curso.materiaId == materiaId){
						return true;
					}
				}
				return false;
			}
		},
	});

	models.alumno = Alumno;
};