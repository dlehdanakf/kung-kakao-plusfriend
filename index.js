var express = require('express');
var app = express();

var keyboard = require('./controllers/keyboard.js');

app.get('/', function (req, res) {
    keyboard();
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(["WOW102"]));
});

app.listen(3000, function () {
    console.log('앱은 3000포트에서 작동중입니다.');
});