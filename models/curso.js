module.exports = function (Sequelize, sequelize, models) {
	var Curso = sequelize.define('curso', {
		materiaId: {
	    	type: Sequelize.INTEGER,
	    	field: 'materia_id',
	    	allowNull: false,
	  	},
	  	docente: {
	    	type: Sequelize.STRING(255),
	    	allowNull: false,
	  	},
		horario: {
	    	type: Sequelize.STRING(255),
	    	allowNull: false,
	  	},
	}, {
		tableName: 'cursos',
		instanceMethods: {
			serialize: function () {
				return this;
			}
		},
	});

	Curso.belongsTo(models.materia, { foreignKey: { name: 'materiaId', field: 'materia_id', allowNull: false } }); 
	models.materia.hasMany(Curso, { foreignKey: { name: 'materiaId', field: 'materia_id', allowNull: false } });

	Curso.listForMateria = function(materiaID, successCB, errorCB){
		Curso.findAll({
			where: {
				materiaId: materiaID	
			}
		}).then(cursos => {
	        var jsonList = cursos.map(function(model) {
	          return model.toJSON();
	        });
	        successCB(jsonList);
	    }, function(err){
	        errorCB('internal');
	    });
	};

	models.curso = Curso;
};