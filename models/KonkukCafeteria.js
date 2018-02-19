var async = require('es5-async-await/async');
var await = require('es5-async-await/await');
var fetch = require('node-fetch');

/**
 * @constructor
 * @param {String} d
 */
function KonkukCafeteria(d){
    function constructor(){
        var fetchMenu = await(
            fetch(
                'https://bablabs.com/openapi/v1/campuses/MoCQZdj1hE/stores/NTQyOTE2?date=2018-02-06', {
                    method: 'GET',
                    headers: {
                        accesstoken: 'q5U2EaUewn0MbtUaIOjg1LQA5OyGyqe7BJeMuaBn1O4cJQnW4l',
                        babsession: 'kung',
                    }
                }
            ).then(function(res){ return res.json(); })
        );

        console.log(fetchMenu);
    }
    function getToday(){
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        if(dd < 10){ dd = '0' + dd; }
        if(mm < 10){ mm = '0' + mm; }

        return yyyy + '-' + mm + '-' + dd;
    }

    /**
     *  @type {string[]}
     *  0. 학생회관 지하 1층
     *  1. 학생회관 지상 1층
     *  2. 도서관 지하 1층
     *  3. 새천년관 교직원식당
     *  4. 기숙사 쿨하우스 식당
     */
    var restaurant = [
        'NTIyNzA0', 'NTMyODA5', 'NTQyOTE2',
        'NTEyNjAx', 'MjEzMzYyNzIx'
    ];

    async(constructor(d ? d : getToday()));
};

module.exports = KonkukCafeteria;