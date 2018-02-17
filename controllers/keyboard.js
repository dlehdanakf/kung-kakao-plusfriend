var KeyboardMessage = require('./../views/keyboard');

module.exports = {
    keyboard: function(req, res){
        res.set('Content-Type', 'application/json');

        var message = new KeyboardMessage();
        message.addButton('오늘의 학식');
        message.addButton('종강일 계산기');
        message.addButton('자취방 매물보기');
        message.addButton('문화초대 이벤트');

        res.send(message.getMessage());
    }
}