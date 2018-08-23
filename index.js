const express = require('express');
const app = express();
const pythonShell = require('python-shell');
const RF_CODES = {
    vibrate : 1116386948,
    shock_1 : 1116400312,
    shock_2 : 1116396200,
    shock_3 : 1116392088,
    shock_4 : 1116387976,
    shock_5: 1116383864,
    shock_6: 1116379752,
    shock_7: 1116375640,
    shock_8: 1116371528,
    shock_9: 1116367416,
    shock_10: 1116363304,
    shock_11: 1116359192,
    shock_12: 1116355080,
    shock_13: 1116351224,
    shock_14: 1116347112,
    shock_15: 1116343000,
    shock_16: 1116404424
}

app.use(express.static(__dirname + '/'));
app.use(express.urlencoded());
app.get('/',(req,res) => res.sendFile(__dirname+'/index.html'));
app.listen(1234,() => console.log('Server started, Listening on port 1234'));

app.post('/shock', (req,res) => {
    console.log(req.body);
    invokeRaspberriGPIO(RF_CODES["shock_"+req.body.level]);
    res.sendStatus(200);
})

app.post('/vibrate', (req,res) => {
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


