var express = require('express');
var app = express();
var mysql = require("mysql2");
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// create the handshake with the app

var connection = mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password: 'password',
    database: 'join_us'
})

//monitor the web app using the web address: http://127.0.0.1:8080

// create query for basic app

app.get("/", function(req, res){
    var z = "SELECT COUNT(*) AS count FROM users"
    connection.query(z, function(error, results, fields) {
        if (error) throw error;
        var count  = results[0].count;
        var message = 'There are ' + count + ' users!';
        // res.send("You've reached the home page");
        // res.send(message)
        res.render("home", {count: count});
    });
    console.log('Someone requested us');
})
//This where we send new people, when a post request is sent to register
app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    var insert_into = "INSERT INTO users SET ?"
    connection.query(insert_into, person, function (error, results){
        if (error) throw error;
        console.log('User sent to /register');
        console.log('New user entered to database')
        res.render('register');
    })
    // req.body.email is how to isolate the email from a form
    console.log('New users email is: ' + req.body.email);
})

// app.get("/joke", function(req, res){
//     var joke = "What does a cat have that no other animal has? Kittens."
//     res.send(joke);
//     console.log('Someone requested a joke');
// })

// app.get('/random_num', function(req, res){
//     var num = Math.floor(Math.random() * 10 ) + 1;
//     res.send("Your lucky number is: " + num)
//     console.log('Someone requested a lucky number')
// })

app.listen(8080, function(){
    console.log("Server running on 8080!");
});
