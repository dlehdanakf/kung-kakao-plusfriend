function ResponseMessage(){
    var text = null;
    var photo = {};
    var message_button = {};
    var keyboard = {
        type: 'text'
    };

    this.setText = function(t){ text = t; return this; }
    this.setPhoto = function(u, w, h){
        photo.url = u;
        photo.width = w;
        photo.height = h;

        return this;
    }
    this.setMessageButton = function(l, u){
        message_button.label = l;
        message_button.url = u;

        return this;
    }
    this.setKeyboard = function(e){
        if(e && typeof e == typeof []){
            keyboard = {
                type: 'buttons',
                buttons: e
            };
        } else {
            keyboard = {
                type: 'text'
            };
        }

        return this;
    }
    this.getMessage = function(){
        var message = {};
        if(text) message.text = text || '텍스트 없음';
        if(photo.url) message.photo = photo;
        if(message_button.label) message.message_button = message_button;

        return JSON.stringify({
	        message: message,
	        keyboard: keyboard
        });
    }
}

module.exports = ResponseMessage;