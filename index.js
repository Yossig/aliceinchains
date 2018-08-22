var shockLevel = 1;

function changeLevel(direction) {
    var validate = direction + shockLevel;
    if(!(validate > 14 || validate < 1)) {
        shockLevel += direction;
    }

    updateView();
}

function updateView() {
    $(".shock-level").text(shockLevel);
}

function shockAction(){
    postAction('{actiontype:"shock", level:'+shockLevel+'}');
}

function vibrateAction(){
    postAction('{action:"vibrate"}')
}

function postAction(action) {
    $.ajax({
        type:"POST",
        url: "http://192.168.0.14:1234/postAction",
        data: action,
        error: function(){
            alert("Could'nt connect to server")
        },
        timeout: 3000
    })
}

$(document).ready(function() {
    updateView();
});
