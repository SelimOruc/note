//    if((typeof alert) === 'undefined') {
//    global.alert = function(message) {
//        console.log(message);
//    }
//}

//needed module
//function check(request,response){
//
//    var bodyParser = require('body-parser')
//    app.use(bodyParser.urlencoded ({extended: false}));
//
//
//        if (request.body.username == "")
//            {
//                alert("Error: Username cannot be blank!");
//            }
//     if(request.body.password != "" && request.body.password == request.body.passwordcheck) {
//          if(request.body.password.length < 6) {
//            alert("Error: Password must contain at least six characters!");
//
//          }
//      }
//  }
//  


function validateFirstName() {
    var username = document.forms["register"]["username"].value;
    var password = document.forms["register"]["password"].value;
    var passwordcheck = document.forms["register"]["passwordcheck"].value;
    var password2 = document.forms["register"]["password2"].value;
    var password2check = document.forms["register"]["password2check"].value;
    var email = document.forms["register"]["email"].value;
    
    
    
        if (username == "")
            {
                alert("Username cannot be blank!");
                return false
            }
        if(password == "") {
            alert('Password cannot be blank!')
            return false
        }
        if(password != passwordcheck)
        {
            alert("The password don't match")
            return false
        }
        
        if (password2 == "")
            {
                alert("The second password cannot be blank!");
                return false
            }
        

        
        if(password2 != password2check)
        {
            alert("The password don't match")
            return false
        }
        
        if (password != password2)
        {
            
            return true
        }
        else{
            alert('The passwords are not allowed to be the same')
            return false
        }
}