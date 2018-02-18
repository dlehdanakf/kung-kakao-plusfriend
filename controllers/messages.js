var async = require('es5-async-await/async');
var await = require('es5-async-await/await');
var Parser = require('rss-parser');
var decode = require('unescape');
var moment = require('moment');
var ResponseMessage = require('./../views/response');

function TodayMeal(req, res){
    res.send('ASDFASDF');
}
function DoomsDay(req, res){
    var d = moment().diff("2018-02-18", 'days');
    res.send(d.toString());
}
var MovieEvent = async(function(req, res){
    var feed = await((new Parser).parseURL('http://kung.kr/event/rss'));
    var message_text = 'KUNG에서 매 달 업데이트되는 건대생을 위한 문화초대 이벤트!\n\n';
    feed.items.forEach(function(item, index){
        message_text += '- ' + decode(item.title) + '\n';
    });

    message_text += '\n더 자세한 사항은 KUNG 홈페이지에서!';

    var message = new ResponseMessage;
    message.setText(message_text);
    message.setMessageButton('이벤트 보러가기', 'http://kung.kr/event');

    res.send(message.getMessage());
});

module.exports = {
    today_meal: TodayMeal,
    dooms_day: DoomsDay,
    movie_event: MovieEvent
};