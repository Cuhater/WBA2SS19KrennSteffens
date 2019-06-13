var express = require('express');
var router = express.Router();
const https = require('https');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let data = '';

    await https.get('https://quiz-wars.herokuapp.com/questions', (resp) => {


        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data));

            let jsonData = JSON.parse(data);
            //let innerKey = Object.keys(data)
            console.log(jsonData.length)
            console.log(jsonData[0])
            console.log(jsonData[1])
            console.log(jsonData[2])

            let anserws = jsonData[1];
            let a0 = anserws[0]
            let a1 = anserws[1]
            let a2 = anserws[2]
            let a3 = anserws[3]

            res.render('question', { qText: jsonData[0], qAnswer0: a0, qAnswer1: a1, qAnswer2: a2, qAnswer3: a3, ra: jsonData[2], title: "Random question" });
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });


});

module.exports = router;
