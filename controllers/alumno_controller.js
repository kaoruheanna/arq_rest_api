var list = function(req,res){
    var alumnos = ['Kaoru Heanna','Felipe Testi','Martin Aguirre'];
    res.send({ success: true, data: alumnos });
}

var add = function(req,res){
    res.send({ success: true, data: 'alumno agregadoooooo' });   
}

var calls = {
    list: list,
    add: add
}

module.exports = calls;