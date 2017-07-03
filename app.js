var express = require('express');
var bodyParser = require('body-parser');
var query = require('./dao');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/login.html', function (req, res) {
    res.sendFile( __dirname + "/" + "login.html" );
});

app.post('/register', urlencodedParser, function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    query("SELECT id FROM user_table where name = ?", [name], function(err, rows, fields) {
        if (err){
            res.send({"state": -1});
            throw err;
        }else{
            if(rows.length > 0){
                res.send({"state": 0});
            }else{
                query("INSERT INTO user_table SET ?", {name: name, password: password}, function(err, rows, fields) {
                    if (err) {
                        res.send({"state": -1});
                        throw err;
                    }else{
                        res.send({"state": 1});
                    }
                });
            }
        }
    });
});

app.post('/login', urlencodedParser, function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    query("SELECT id FROM user_table where name = ? and password = ?", [name, password], function(err, rows, fields) {
        if (err){
            res.send({"id": -1});
            throw err;
        }else{
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.send({"id": -1});
            }
        }
    });
});
 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("注册，访问地址为 http://%s:%s", host, port)
});