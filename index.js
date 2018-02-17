var express = require('express');
var bodyParser = require('body-parser');

var KeyboardController = require('./controllers/keyboard');
var MessagesController = require('./controllers/messages');
var ResponseMessage = require('./views/response');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/keyboard', KeyboardController.keyboard);
app.post('/message', function(req, res){
    res.set('Content-Type', 'application/json');
    switch(req.body.content){
        case '오늘의 학식': MessagesController.todaymeal(req, res); break;
        case '종강일 계산기': MessagesController.doomsday(req, res); break;
        case '자취방 매물보기': break;
        case '문화초대 이벤트': break;
        default:
            var m = new ResponseMessage;
            m.text = '404 Not found'
            res.status(404).send(m);
    }
});

app.listen(3000, function () {
    console.log('앱은 3000포트에서 작동중입니다.');
});