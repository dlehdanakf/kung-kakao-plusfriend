var async = require('es5-async-await/async');
var await = require('es5-async-await/await');
var FormData = require('form-data');
var sizeOf = require('image-size');
var Parser = require('rss-parser');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var decode = require('unescape');
var moment = require('moment');
var http = require('http');
var url = require('url');
var ResponseMessage = require('./../views/response');

var KonkukCafeteria = require('./../models/KonkukCafeteria');

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
function RealEstate(req, res){
    var message = new ResponseMessage;
    message.setText('[학교주변 원룸 알아보기]\n건국대학교 커뮤니티 KUNG과 제휴한 부동산 매물이 올라오는 게시판입니다.');
    message.setMessageButton('게시판 바로가기', 'http://kung.kr/real_estate');
    message.setPhoto('http://kung.kr/files/attach/images/1244024/937/469/005/a7458affca594f03c0ad68caef355936.png', 1024, 768);

    res.send(message.getMessage());
}
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
var MovieEvent = async(function(req, res){
    var req_index = 0;
    var feed = await((new Parser).parseURL('http://kung.kr/event/rss'));
    var message_text = 'KUNG에서 매 월 업데이트되는 건대생을 위한 문화초대 이벤트!\n\n';
    var event_item = {};
    feed.items.forEach(function(item, index){
        if(req_index !== index) return;

        event_item.title = decode(item.title);
        event_item.link = item.link;
        event_item.description = decode(item.content);

        var $ = cheerio.load(event_item.description);
        event_item.image = $('img').attr('src')
    });

    message_text += event_item.title;
    message_text += '\n\n보다 자세한 내용은 KUNG 홈페이지에서 확인하시기 바랍니다.'

    http.get(url.parse(event_item.image), function(response){
        var chunks = [];
        response.on('data', function(chunk){
            chunks.push(chunk);
        }).on('end', function(){
            var buffer = sizeOf(Buffer.concat(chunks)),
                message = new ResponseMessage;

            message.setText(message_text);
            message.setPhoto(event_item.image, buffer.width, buffer.height);
            message.setMessageButton('이벤트 보러가기', event_item.link);

            res.send(message.getMessage());
        });
    });
});

module.exports = {
    today_meal: TodayMeal,
    movie_event: MovieEvent,
    dooms_day: DoomsDay,
    real_estate: RealEstate
};