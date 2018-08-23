const express = require('express');
const app = express();
const pythonShell = require('python-shell');
const RF_CODES = {
    vibrate : 1,
    shock_1 : 2,
    shock_2 : 3,
    shock_3 : 4,
    shock_4 : 5,
    shock_5: 6,
    shock_6: 7,
    shock_7: 8,
    shock_8: 9,
    shock_9: 10,
    shock_10: 11,
    shock_11: 12,
    shock_12: 13,
    shock_13: 14,
    shock_14: 15
}

app.use(express.static(__dirname + '/'));
app.use(express.urlencoded());
app.get('/',(req,res) => res.sendFile(__dirname+'/index.html'));
app.listen(1234,() => console.log('Server started, Listening on port 1234'));

app.post('/shockAction', (req,res) => {
    console.log(req.body);
    invokeRaspberriGPIO(RF_CODES["shock_"+req.body.level]);
    res.sendStatus(200);
})

app.post('/vibrateAction', (req,res) => {
    console.log(req.body);
    invokeRaspberriGPIO(RF_CODES.vibrate);
    res.sendStatus(200);
})

function invokeRaspberriGPIO(code) {
    console.log(code);
    pythonShell.run(__dirname+'/python_scripts/sender.py',{args:[code,"-t 2","-p 512"]}, (err,result) => {
        if(err) throw err;

        console.log(result);
    })
}


