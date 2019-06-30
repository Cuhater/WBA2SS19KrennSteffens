var express = require('express');
var router = express.Router();
const https = require('https');
const http = require('http');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let data = '';
    let myQuery = '';

    let myTopics = await getServerTopics();
    for (let i = 0; i < myTopics.length ; i++) {
        if (req.query.type === myTopics[i]) {
            console.log(myTopics[i] + " AUFGERUFEN")
            myQuery = '?type=' + myTopics[i]
            console.log(myQuery)
        }
    }
    await http.get('http://localhost:3000/questions' + myQuery, (resp) => {
        let a0 = '';
        let a1 = '';
        let a2 = '';
        let a3 = '';
        let qText = '';
        let ra = '';
        let df = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
            console.log("I GOT DATA")
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data));
            let jsonData = JSON.parse(data);
            if (req.query.type !== 'custom') {
                let answers = jsonData[1];
                a0 = answers[0]
                a1 = answers[1]
                a2 = answers[2]
                a3 = answers[3]
                qText = jsonData[0];
                ra = jsonData[2];
                df = jsonData[3];

            } else if (req.query.type === 'custom') {

                let values = Object.values(jsonData)
                let innerObject = values[0]
                let myAnswers = innerObject[1];

                let myAnswerKeys = Object.values(myAnswers)
                a0 = myAnswerKeys[0]
                a1 = myAnswerKeys[1]
                a2 = myAnswerKeys[2]
                a3 = myAnswerKeys[3]
                ra = innerObject[2]
                qText = innerObject[0]
            } else {
                a0 = "a1"
                a1 = "a2"
                a2 = "a3"
                a3 = "a4"
            }

            res.render('question', {
                qText: qText,
                qAnswer0: a0,
                qAnswer1: a1,
                qAnswer2: a2,
                qAnswer3: a3,
                ra: ra,
                title: "Random question",
                df: df
            });
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });


});

module.exports = router;
