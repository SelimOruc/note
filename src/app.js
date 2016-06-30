var Sequelize = require('sequelize')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var session = require('express-session')

app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

var sequelize = new Sequelize('noteapp', 'postgres', "Selim0ruc", {
	host: 'localhost',
	dialect: 'postgres',
        define: {
		timestamps: false
	}
});

var Register = sequelize.define('register', {
	username: Sequelize.TEXT,
	password: Sequelize.TEXT,
        password2: Sequelize.TEXT,
        email: Sequelize.TEXT
});

app.set ("views", "src/views");
app.set ("view engine","jade");

app.get('/',function (request,response){
    response.render('index')
})

app.get('/login', function (request, response){
    response.render('login')
})

app.post("/login", function (request,response){
    if(request.body.username.length === 0) {
		response.redirect('login');
		return;
	}
        
    if(request.body.password.length === 0) {
		response.redirect('login');
		return;
	}
        
    Register.findOne({
		where: {
			username: request.body.username
		}
	}).then(function (user) {
		if (user !== null && request.body.password === user.password) {
			request.session.user = user;
			response.redirect('/homepage');
		} else {
			response.redirect('/login');
		}
	});
})













sequelize.sync({force: false})
var server = app.listen(3000 , function (){
    
        console.log("example app listening on port : " + server.address().port)
})
