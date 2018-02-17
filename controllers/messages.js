var moment = require('moment');

function TodayMeal(req, res){
    res.send('ASDFASDF');
}
function DoomsDay(req, res){
    var d = moment().diff("2018-02-18", 'days');
    res.send(d.toString());
}

module.exports = {
    todaymeal: TodayMeal,
    doomsday: DoomsDay
};