function ResponseMessage(){
    var text = null;
    var photo = {};
    var message_button = {};

    this.setText = function(t){ text = t; }
    this.setPhoto = function(u, w, h){
        photo.url = u;
        photo.width = w;
        photo.height = h;
    }
    this.setMessageButton = function(l, u){
        message_button.label = l;
        message_button.url = u;
    }
    this.getMessage = function(){
        var message = {};
        if(text) message.text = text || '텍스트 없음';
        if(photo.url) message.photo = photo;
        if(message_button.label) message.message_button = message_button;

        return JSON.stringify({
	        message: message,
	        keyboard: {
		        type: 'text'
	        }
        });
    }
}

module.exports = ResponseMessage;