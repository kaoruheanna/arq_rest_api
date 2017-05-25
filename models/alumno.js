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
			}
		},
	});

	models.alumno = Alumno;
};