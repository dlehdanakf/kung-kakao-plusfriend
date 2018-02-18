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
        case '오늘의 학식': MessagesController.today_meal(req, res); break;
        case '종강일 계산기': MessagesController.dooms_day(req, res); break;
        case '자취방 매물보기': break;
        case '문화초대 이벤트': MessagesController.movie_event(req, res); break;
        case '메인으로':
            res.send(
                JSON.stringify(
                    (new ResponseMessage)
                        .setKeyboard([
                            '오늘의 학식',
                            '종강일 계산기',
                            '자취방 매물보기',
                            '문화초대 이벤트'
                        ])
                        .getMessage()
                )
            );
            break;
        default:
            res.send(
                JSON.stringify(
                    (new ResponseMessage)
                        .setText('잘못된 요청입니다.\n다시 입력해주세요.')
                        .setKeyboard([
                            '메인으로'
                        ])
                        .getMessage()
                )
            );
    }
});

app.listen(3000, function () {
    console.log('앱은 3000포트에서 작동중입니다.');
});