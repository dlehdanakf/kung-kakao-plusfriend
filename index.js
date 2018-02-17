var express = require('express');
var app = express();

var KeyboardController = require('./controllers/keyboard.js');

app.get('/keyboard', KeyboardController.keyboard);

app.listen(3000, function () {
    console.log('앱은 3000포트에서 작동중입니다.');
});