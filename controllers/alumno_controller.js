var async = require('async');

var list = function(req,res){
    req.models.alumno.findAll().then(alumnos => {
        var jsonList = alumnos.map(function(model) {
          return model.toJSON();
        });
        res.send({ success: true, data: jsonList });
    }, function(err){
        console.log("error list: "+err);
        res.send({ error: 'internal' });
    });
}

var add = function(req,res){
    res.send({ success: true, data: 'alumno agregadoooooo' });   
}

var calls = {
    list: list,
    add: add
}

module.exports = calls;