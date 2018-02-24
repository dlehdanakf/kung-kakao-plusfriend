var async = require('es5-async-await/async');
var await = require('es5-async-await/await');
var FormData = require('form-data');
var Parser = require('rss-parser');
var fetch = require('node-fetch');
var decode = require('unescape');
var moment = require('moment');
var ResponseMessage = require('./../views/response');

var KonkukCafeteria = require('./../models/KonkukCafeteria');

var TodayMeal = async(function(req, res){
    var cafeteria = new KonkukCafeteria,
        message = new ResponseMessage,
        i = 0;
    while(i < 2){
        if(cafeteria.fetch_status == 401){
            if(i < 0){
                cafeteria.fetch_status = 500;
            } else {
                i++;
                continue;
            }
        }
        if(cafeteria.fetch_status == 500){
            message.setText(
                '학식정보를 가져오던 도중 오류가 발생했습니다.\n' +
                '문제가 지속될 경우 관리자에게 문의바랍니다.'
            );
            break;
        }

        message.setText(cafeteria.getStoreMenu());

        break;
    }

    res.send(message.getMessage());
});
function DoomsDay(req, res){
    var d = parseInt(moment().diff("2018-02-18", 'days').toString()),
    	str = '종강일(2018년 09월 01일)',
        message = new ResponseMessage;
    
    if(d > 0) str += ' 까지\n' + d + '일 남았습니다...ㅠㅠ';
    if(d == 0) str += '\n바로 오늘입니다아ㅏㅏㅏㅏㅏㅏ';
    if(d < 0) str += ' 에서\n' + d + '일 지났습니다.';
    
    message.setText(str);
    
    res.send(message.getMessage());
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