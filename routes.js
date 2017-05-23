var route = require('./controllers');
var settings = require('./settings');

module.exports = function (app) {
    
    app.route('/alumno')
        .get(route.alumno.list)
        .post(route.alumno.add);
        

    // respond with "hello world" when a GET request is made to the homepage
    app.get('/', function (req, res) {
        res.send('HOLA MUNDO!')
    })
};
