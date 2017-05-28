module.exports = function (Sequelize, sequelize, models) {
	var Materia = sequelize.define('materia', {
		nombre: {
	    	type: Sequelize.STRING(255),
	    	allowNull: false,
	  	}
	}, {
		tableName: 'materias',
		instanceMethods: {
			serialize: function () {
				return this;
			}
		},
	});

	models.materia = Materia;
};