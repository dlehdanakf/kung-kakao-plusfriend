var KeyboardMessage = require('./../views/keyboard');

module.exports = {
    keyboard: function(req, res){
        res.set('Content-Type', 'application/json');

        var message = new KeyboardMessage();
        message.addButton('TEST');

        res.send(message.getMessage());
    }
}