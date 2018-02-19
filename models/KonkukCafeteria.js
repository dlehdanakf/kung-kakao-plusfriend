var async = require('es5-async-await/async');
var await = require('es5-async-await/await');
var fetch = require('node-fetch');

function KonkukCafeteria(d){
    function constructor(){
        var response = await(fetchMenu());
        if(response.result.status_code == 200) {
            //  Success
            _this.fetch_status = 200;
            _this.fetch_result = {};
            response.stores.forEach(function(v, i){
                _this.fetch_result[v.id] = [];
                v.menus.forEach(function(m, j){
                    var sub_menu = m.description;
                    while(sub_menu.indexOf('.') != -1){ sub_menu = sub_menu.replace('.', ' '); }
                    while(sub_menu.indexOf('  ') != -1){ sub_menu = sub_menu.replace('  ', ' '); }
                    sub_menu = sub_menu.trim();
                    var sub_menu_arr = sub_menu.split(' ');
                    sub_menu = sub_menu.replace(' ', ', ');

                    var main_menu = m.name.trim();
                    if(!main_menu || main_menu == '' || main_menu == 'Cafeteria'){
                        main_menu = sub_menu_arr[0];
                        sub_menu_arr.splice(0, 1);
                        sub_menu = sub_menu_arr.join(', ');
                    }

                    _this.fetch_result[v.id].push({
                        main: main_menu,
                        sub: sub_menu,
                        arr: sub_menu_arr
                    });
                });
            });

        } else if(response.result.status_code == 401) {
            //  No Permission -> Get a new token
            _this.fetch_status = 401;
        } else {
            _this.fetch_status = 500;
        }
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
    function getTodayFormat(){
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        if(dd < 10){ dd = '0' + dd; }
        if(mm < 10){ mm = '0' + mm; }

        return yyyy + '년 ' + mm + '월 ' + dd + '일';
    }

    var _this = this;
    var restaurant = {
        NTIyNzA0: '학생회관(아워홈)',
        NTMyODA5: '학생회관(신세계)',
        NTQyOTE2: '상허도서관(아워홈)',
        NTEyNjAx: '새천년관(교직원식당)',
        MjEzMzYyNzIx: '쿨하우스(기숙사)'
    };

    var fetchMenu = async(function(){
        return await(
            fetch(
				'https://bablabs.com/openapi/v1/campuses/MoCQZdj1hE/stores?date=' + getToday(), {
                    method: 'GET',
                    headers: {
                        accesstoken: 'q5U2EaUewn0MbtUaIOjg1LQA5OyGyqe7BJeMuaBn1O4cJQnW4l',
                        babsession: 'kung',
                    }
                }
            ).then(function(res){ return res.json(); })
        );
    });

    this.fetch_status = 500;
    this.fetch_result = [];
    this.getStoreMenu = function(){
        var return_string = getTodayFormat() + ' 학식정보';

        for(var v in restaurant){
	        console.log(restaurant[v]);
            return_string += '\n\n<' + restaurant[v] + '>';

            for(var m in this.fetch_result[v]){
                return_string += '\n=> ' + this.fetch_result[v][m].main;
                if(this.fetch_result[v][m].arr.length > 0)
                    return_string += '\n     ' + this.fetch_result[v][m].sub;
            }
            if(this.fetch_result[v].length < 1)
                return_string += '\n=> 식당에서 식단을 업로드하지 않았습니다.';
            
            return_string += '\n\n====================';
        }
        
        return_string += '\n상기 내용은 컴퓨터에 의해 자동으로 가져온 정보로 식당 운영사정 및 기타 사유로 인해 정확하지 않을 수 있습니다.'

        return return_string;
    }

    async(constructor());
};

module.exports = KonkukCafeteria;