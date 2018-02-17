function ResponseMessage(){
    this.text = null;
    this.photo;
    this.message_button;
}

ResponseMessage.prototype.photo = function(url, width, height){
    this.url = url;
    this.width = width;
    this.height = height;
}
ResponseMessage.prototype.message_button = function(label, url){
    this.label = label;
    this.url = url;
}

module.exports = ResponseMessage;