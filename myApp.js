const { query } = require('express');
let express = require('express');
let app = express();
var bGround = require('fcc-express-bground');
require("dotenv").config()


app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);

    next();
});






bGround.log("Hello World");
console.log("Hello World");


app.get("/", function (reg, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

//app.get("/json", (req, res) => {
//  res.json({
//    message: "Hello json"
//  });
//});


app.get("/json", function(req, res){
    var jsonResponse = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === "uppercase") {
        jsonResponse.message = jsonResponse.message.toUpperCase()
    }
    res.json(jsonResponse)
});




function getCurrentTimeString() {
    return new Date().toString();
}



app.get("/now", (req, res, next) => {
    req.time = getCurrentTimeString();
    next();
}, function(req, res){
    res.json({ time: req.time });
});


app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word});
});


//get input from client: query parameters
app.get("/name",(req, res) => {
    res.json({ name: req.query.first + " " + req.query.last});
    
});









 module.exports = app;