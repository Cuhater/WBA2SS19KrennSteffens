var express = require('express');
var router = express.Router();
const functions = require('../public/javascripts/functions');

let myEditetObject = {};
let postedContent = {};
let answerArray = [];
const fs = require('fs');


router.get('/', async (req, res) => {

    let myArray;
    let arrayindex;
    let myQuestionText;
    let topics = [];
    let topicArray;

    topics.push('species');
    topics.push('planets');
    topics.push('people');
    topics.push('vehicles');
    topics.push('starships');
    topics.push('films');
    //topics.push('custom');


    // Check query for specific response
    if (req.query.type === undefined) {
        let rnd = getRandom(topics.length);
        let rndTopic = topics[rnd];
        myQuestionText = getQuestionTemplate(rndTopic);
        arrayindex = rnd;
    } else if (req.query.type === 'custom') {

        // TODO: GET custom Question from Database
        myQuestionText = getQuestionTemplate("custom");
        arrayindex = 6;

    } else if (req.query.type === 'species') {
        arrayindex = 0;
        // AN der stelle Daten überschreiben
        

        try{
        topicArray = await getData(baseURL, '/species/', '?page=1')
        }
        catch(err)
        {
            res.status(500).send(err + "500 Internal Error")
        }

        myArray = overwriteData(topicArray, arrayindex);
        myQuestionText = getQuestionTemplate("species");


    } else if (req.query.type === 'planets') {
        myQuestionText = getQuestionTemplate("planets");
        arrayindex = 1;
    } else if (req.query.type === 'people') {
        myQuestionText = getQuestionTemplate("people");
        arrayindex = 2;
    } else if (req.query.type === 'vehicles') {
        myQuestionText = getQuestionTemplate("vehicles");
        arrayindex = 3;
    } else if (req.query.type === 'starships') {
        myQuestionText = getQuestionTemplate("starships");
        arrayindex = 4;
    } else if (req.query.type === 'films') {
        myQuestionText = getQuestionTemplate("films");
        arrayindex = 5;
    }

    cleanUpData();
    myArray = getAllData();

    let myQuestion = await getValue(myArray[arrayindex], myQuestionText.cat, myQuestionText.text);
    answerArray = [];

    res.status(200).send(myQuestion);

});

getDBData = () => {
    let counter = 0;
    return new Promise((resolve, reject) => {
        fs.readFile('database.json', (err, data) => {

            if (err) throw err;
            let isThereData = JSON.parse(data);
            counter = isThereData.length;
            resolve(isThereData)
        })
    })
};


router.put('/', async (req, res) => {

    let dbData = await getDBData();
    let innerObject;
    let innerKeys;

    let error = false;
    let stockData = await getDBData();


    if (!req.body.userID || !req.body.qID) {
        error = true;
        res.contentType("text/plain");
        res.status(400).send("| -- Error 400 -- |\n| -- Bad request -- | \n\nINFO: Please adhere to the correct format!\n\nFor further information take a look at the wiki.\nhttps://github.com/Cuhater/WBA2SS19SchuerheckKrennSteffens/wiki/3.-Rest-Modellierung")
    }

    if (!error) {
        innerKeys = Object.keys(dbData);

        for (let i = 0; i < dbData.length; i++) {
            innerObject = Object.values(dbData[i]);

            let x = innerObject[0];

/*            console.log("\n UserID: " + x[3]);
            console.log("req.body: " + req.body.userID);*/


            // USER ID MATCHES
            if (x[3] === req.body.userID) {


                // CHECK IF QUESTION ID MATCH
                if (innerKeys[i] === req.body.qID) {
/*                      console.log("inner keys" + innerKeys[i]);
                        console.log("DB DATA I " + x + "\n");*/
/*                      console.log("DB DATA 1 " + x[1] + "\n");*/
                    let currentAnswersArray = x[1];
                    console.log(currentAnswersArray);

                    let currentAnswers = Object.values(currentAnswersArray);

                    // Test console log Data
                    /*console.log("x[0] -> Fragetext :  " + x[0] + "\n");
                    console.log("Antwort 0 : " + currentAnswers[0]);
                    console.log("Antwort 1 : " + currentAnswers[1]);
                    console.log("Antwort 2 : " + currentAnswers[2]);
                    console.log("Antwort 3 : " + currentAnswers[3]);
                    console.log("Richtige Stelle : " + x[2] + "\n");
                    console.log("\n\n --");
                    console.log(req.body.answers.a1);
                    console.log(req.body.answers.a2);
                    console.log(req.body.answers.a3);
                    console.log(req.body.answers.a4);*/

                    // Daten im jsonObjeect mit Daten des Requests überschreiben
                    let jsonObject = {};
                    jsonObject["a1"] = req.body.answers.a1;
                    jsonObject["a2"] = req.body.answers.a2;
                    jsonObject["a3"] = req.body.answers.a3;
                    jsonObject["a4"] = req.body.answers.a4;
                    x[0] = req.body.text;
                    currentAnswers[0] = req.body.answers.a1;
                    currentAnswers[1] = req.body.answers.a2;
                    currentAnswers[2] = req.body.answers.a3;
                    currentAnswers[3] = req.body.answers.a4;
                    x[2] = req.body.right;

                    let questionID = req.body.qID;

                    // Object mit Daten füllen
                    myEditetObject[questionID] = [];
                    myEditetObject[questionID].push(x[0]);
                    myEditetObject[questionID].push(jsonObject);
                    myEditetObject[questionID].push(x[2]);
                    myEditetObject[questionID].push(req.body.userID);

                    //splice starting at postition i and remove 1 element
                    stockData.splice(i, 1);
                    // push new Data
                    stockData.push(myEditetObject);

                    fs.writeFile('database.json', JSON.stringify(stockData, null, 2), (err) => {
                        if (err) throw err;
                        console.log('The Question were updated!');
                    });
                }
            }
        }
        res.status(200).send(stockData);
    }

});

router.post('/', async (req, res, next) => {
    let counterr = await getDBData();
    let counter = counterr.length;

    postedContent[counter] = []; // empty Array, which you can push() values into

    let customQuestonAnswers = [];

    // Fragetext vorhanden?
    if (req.body.text !== undefined) {
        postedContent[counter].push(req.body.text);
    }
    if (req.body.answers !== undefined) {
        postedContent[counter].push(req.body.answers);
        customQuestonAnswers.push(req.body.answers.a1);
        customQuestonAnswers.push(req.body.answers.a2);
        customQuestonAnswers.push(req.body.answers.a3);
        customQuestonAnswers.push(req.body.answers.a4)
        /*      console.log(customQuestonAnswers[0] + " stelle 0");
                console.log(customQuestonAnswers[1] + " stelle 1");
                console.log(customQuestonAnswers[2] + " stelle 2");
                console.log(customQuestonAnswers[3] + " stelle 3");
        */
    }
    if (req.body.right !== undefined) {
        postedContent[counter].push(req.body.right);
    }
    postedContent[counter].push(req.body.userID);

    let myData = [];

    fs.readFile('database.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        console.log(dbData);

        let b = [];

        b.push(postedContent);
        myData = dbData.concat(b);


        fs.writeFile('database.json', JSON.stringify(myData, null, 2), (err) => {
            if (err) throw err;
            console.log('The Database were updated!');
        });

        res.status(200).send(JSON.stringify(myData, null, 2));
    });

});

router.delete('/:questionID', async (req, res, next) => {


    console.log(req.params);

    let myDBData = await getDBData();

    //Check if userID match
    for (let i = 0; i < myDBData.length; i++) {

        let innerKeys = Object.keys(myDBData);
        if (req.params["questionID"] === innerKeys[i]) {

            myDBData.splice(i, 1);

            fs.writeFile('database.json', JSON.stringify(myDBData, null, 2), (err) => {
                if (err) throw err;
                console.log('The Database were updated!');
            });

        }
        // Testing purpose check whats inside object
        /*let innerObject = Object.values(myDBData[i]);
        let x = innerObject[0];
        //console.log("x2" +x[2])
        console.log("\n UserID: " + x[3]);
        console.log("req.body: " + req.body.userID)*/
    }
    res.status(200).send(myDBData);
});
module.exports = router;


