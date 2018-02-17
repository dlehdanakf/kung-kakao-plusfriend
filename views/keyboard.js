function Keyboard(){
    var type = 'buttons';
    var buttons = [];

    this.addButton = function(label){ buttons.push(label); }
    this.getMessage = function(){
        return JSON.stringify({
            type: type,
            buttons: buttons
        });
    }
}

module.exports = Keyboard;