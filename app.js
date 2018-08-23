let shockLevel = 1;
const url = "http://192.168.1.13:1234"; 

function changeLevel(direction) {
    var validate = direction + shockLevel;
    if(!(validate > 16 || validate < 1)) {
        shockLevel += direction;
    }

    updateView();
}

function updateView() {
    $(".shock-level").text(shockLevel);
}

function shockAction(){
    postAction(JSON.parse('{"action":"shock", "level":'+shockLevel+'}'),"shock");
    $(".alice").attr("src","images/alice_shocked.png");
    setTimeout(function() {
        $(".alice").attr("src","images/alice.png");
    },500);
}

function vibrateAction(){
    postAction(JSON.parse('{"action":"vibrate"}'),"vibrate");
}

function postAction(data,action) {
    console.log(action);
    $.ajax({
        type:"POST",
        url: url+"/"+action,
        data: data,
        error: function(){
            alert("Could'nt connect to server");
        },
        timeout: 3000
    })
}

$(document).ready(function() {
    updateView();
});
