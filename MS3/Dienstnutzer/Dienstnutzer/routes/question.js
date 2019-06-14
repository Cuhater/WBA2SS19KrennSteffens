var express = require('express');
var router = express.Router();
const https = require('https');
const http = require('http');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let data = '';
    let myQuery = '';

    if (req.query !== {})
    {

    }
    if (req.query.type === 'species')
    {
        console.log("SPECIES AUFGERUFEN")
        myQuery = '?type=species'
        console.log(myQuery)
    }
    if (req.query.type === 'planets')
    {
        console.log("PLANETS AUFGERUFEN")
        myQuery = '?type=planets'
        console.log(myQuery)
    }
    if (req.query.type === 'people')
    {
        console.log("PEOPLE AUFGERUFEN")
        myQuery = '?type=people'
        console.log(myQuery)
    }
    if (req.query.type === 'vehicles')
    {
        console.log("VEHICLES AUFGERUFEN")
        myQuery = '?type=vehicles'
        console.log(myQuery)
    }
    if (req.query.type === 'starships')
    {
        console.log("STARSHIPS AUFGERUFEN")
        myQuery = '?type=starships'
        console.log(myQuery)
    }
    if (req.query.type === 'films')
    {
        console.log("FILMS AUFGERUFEN")
        myQuery = '?type=films'
        console.log(myQuery)
    }
    if (req.query.type === 'custom')
    {
        console.log("CUSTOM AUFGERUFEN")
        myQuery = '?type=custom'
        console.log(myQuery)
    }


    console.log("b4 AWAIT :O")

    await http.get('http://localhost:3000/questions' + myQuery, (resp) => {


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
