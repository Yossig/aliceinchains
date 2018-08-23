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
    postAction(JSON.parse('{"action":"shock", "level":'+shockLevel+'}'),"shock");
}

function vibrateAction(){
    postAction(JSON.parse('{"action":"vibrate"}'),"vibrate");
}

function postAction(data,action) {
    console.log(action);
    $.ajax({
        type:"POST",
        url: "http://192.168.43.240:1234/"+action+"Action",
        data: data,
        error: function(){
            alert("Could'nt connect to server")
        },
        timeout: 3000
    })
}

$(document).ready(function() {
    updateView();
});
