var express = require('express');
var router = express.Router();
const https = require('https');
const http = require('http');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let data = '';
    let myQuery = '';

    let myTopics = await getServerTopics();
/*    console.log(myTopics)
    console.log(myTopics[0])
    console.log(myTopics[1])
    console.log(myTopics[2])
    console.log(myTopics[3])*/

    for (let i = 0; i < myTopics.length ; i++) {
        if (req.query.type === myTopics[i]) {
            console.log(myTopics[i] + " AUFGERUFEN")
            myQuery = '?type=' + myTopics[i]
            console.log(myQuery)
        }
    }
/*

    if (req.query !== {}) {

    }
    if (req.query.type === 'species') {
        console.log("SPECIES AUFGERUFEN")
        myQuery = '?type=species'
        console.log(myQuery)
    }
    if (req.query.type === 'planets') {
        console.log("PLANETS AUFGERUFEN")
        myQuery = '?type=planets'
        console.log(myQuery)
    }
    if (req.query.type === 'people') {
        console.log("PEOPLE AUFGERUFEN")
        myQuery = '?type=people'
        console.log(myQuery)
    }
    if (req.query.type === 'vehicles') {
        console.log("VEHICLES AUFGERUFEN")
        myQuery = '?type=vehicles'
        console.log(myQuery)
    }
    if (req.query.type === 'starships') {
        console.log("STARSHIPS AUFGERUFEN")
        myQuery = '?type=starships'
        console.log(myQuery)
    }
    if (req.query.type === 'films') {
        console.log("FILMS AUFGERUFEN")
        myQuery = '?type=films'
        console.log(myQuery)
    }
    if (req.query.type === 'custom') {
        console.log("CUSTOM AUFGERUFEN")
        myQuery = '?type=custom'
        console.log(myQuery)
    }

*/

    console.log("b4 AWAIT :O")

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

            //let innerKey = Object.keys(data)

            if (req.query.type !== 'custom') {
                console.log(jsonData.length)
                console.log(jsonData[0])
                console.log(jsonData[1])
                console.log(jsonData[2])

                let answers = jsonData[1];
                a0 = answers[0]
                a1 = answers[1]
                a2 = answers[2]
                a3 = answers[3]

                qText = jsonData[0];
                ra = jsonData[2];
                df = jsonData[3];


            } else if (req.query.type === 'custom') {

                let keys = Object.keys(jsonData)
                let values = Object.values(jsonData)
                let eb = Object.entries(jsonData)


                console.log("JSONDATA" + jsonData)
                console.log("vb" + values)
                console.log("eb" + eb)
                console.log(keys + "KEYS :O")
                /*                console.log(values[0])
                                console.log(values[1])
                                console.log(values[2])
                                console.log(values[3])*/
                let innerObject = values[0]

                console.log("io" + innerObject)
                console.log("io1" + innerObject[0])
                console.log("io2" + innerObject[1])
                console.log("io3" + innerObject[2])
                console.log("io4" + innerObject[3])


                let innerData = innerObject
                console.log("innner" + innerData)
                let myQuestionText = innerData[0]
                let myAnswers = innerObject[1];
                console.log("ma0" + myAnswers)

                let myAnswerKeys = Object.values(myAnswers)

                console.log("mak0" + myAnswerKeys[0])
                console.log("mak1" + myAnswerKeys[1])
                console.log("mak2" + myAnswerKeys[2])
                console.log("mak3" + myAnswerKeys[3])
                a0 = myAnswerKeys[0]
                a1 = myAnswerKeys[1]
                a2 = myAnswerKeys[2]
                a3 = myAnswerKeys[3]

                ra = innerObject[2]
                qText = innerObject[0]


                console.log("a0" + a0)
                console.log("a1" + a1)
                console.log("a2" + a2)
                console.log("a3" + a3)
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
