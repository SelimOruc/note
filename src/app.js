//needed module
var Sequelize = require('sequelize')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var session = require('express-session')
app.use(bodyParser.urlencoded ({extended: false}));
app.use(express.static('./resource'));



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

var Note = sequelize.define('note', {
	title: Sequelize.TEXT,
	bericht: Sequelize.TEXT,
});

Register.hasMany(Note);
Note.belongsTo(Register);

app.set ("views", "src/views");
app.set ("view engine","jade");

app.get('/',function (request,response){
    response.render('index')
})
app.post("/", function (request,response){
    if(request.body.username.length === 0) {
		response.redirect('/');
		return;
	}
        
    if(request.body.password.length === 0) {
		response.redirect('/');
		return;
	}
        
    Register.findOne({
		where: {
			username: request.body.username
		}
	}).then(function (user) {
		if (user !== null && request.body.password === user.password) {
			request.session.user = user;
                        request.session.admin = true;
			response.redirect('/homepage');
		} 
                else if (user !== null && request.body.password === user.password2)
                {
                            request.session.user = user;
                            request.session.admin = false;
                            response.redirect('/homepage');
                }   
                else {
			response.redirect('/');
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


app.get('/register',function (request,response){
    response.render('register')
})

app.post("/register",function(request,response){    
    
	Register.create({
            username: request.body.username,
            password: request.body.password,
            password2: request.body.password2,
            email: request.body.email
	}).then(function(){
                response.render('index')
        })
})

//
//app.get('/login', function (request, response){
//    response.render('login')
//})




app.get('/homepage',function(request, response){
        	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/');
	}

        Note.findAll({
            where:{
                        registerId : request.session.user.id
                    }
        }).then(function(theposts){
                response.render('homepage',{ note : theposts, admin: request.session.admin});
            })
})



app.get('/wall',function(request,response){
     console.log('User id is ' + request.session.user.id)
                Note.findAll({
                    where:{
                        registerId : request.session.user.id
                    }
                   
                }).then(function(theposts){
                response.render('wall',{ note : theposts});
            })
    
    
})



app.post('/wall',function (request,response){
	Note.create({
           title: request.body.title ,
           bericht: request.body.body,
           registerId: request.session.user.id
	}).then(function(){
               Note.findAll().then(function(theposts){
                //response.send(theposts)
                response.render('wall',{ note : theposts});
            })
        })
})







sequelize.sync({force: false})
var server = app.listen(3000 , function (){
    
        console.log("example app listening on port : " + server.address().port)
})
