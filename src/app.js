//needed module
var Sequelize = require('sequelize')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var session = require('express-session')
app.use(bodyParser.urlencoded ({extended: false}));



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

app.get('/register',function (request,response){
    response.render('register')
})

app.post("/register",function(request,response){
//    if((typeof alert) === 'undefined') {
//    global.alert = function(message) {
//        console.log(message);
//    }
//}
//    if (request.body.username == "")
//        {
//            alert("Error: Username cannot be blank!");
//        }
// if(request.body.password != "" && request.body.password == request.body.passwordcheck) {
//      if(request.body.password.length < 6) {
//        alert("Error: Password must contain at least six characters!");
//
//      }
//  }
    
    
	Register.create({
            username: request.body.username,
            password: request.body.password,
            password2: request.body.password2,
            email: request.body.email
	}).then(function(){
                response.render('index')
        })
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


app.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/');
	})
});


app.get('/homepage',function(request, response){
        	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/');
	}
    response.render('homepage')
})










sequelize.sync({force: false})
var server = app.listen(3000 , function (){
    
        console.log("example app listening on port : " + server.address().port)
})
