var express = require('express');
var router = express.Router();
const functions = require('../public/javascripts/functions');

let baseURL = 'https://swapi.co/api';

let myEditetObject = {};

let answerArray = [];
const fs = require('fs');

let topics = getAllTopics();


router.get('/allCustom', async (req, res) => {

    let customQuestionData = await getDBData();
    res.status(200).send(customQuestionData)
});



router.get('/:questionID', async (req, res) => {
    let topicData;
    let qPoolData = await getQuestionPoolData();
    let questionID = req.params["questionID"]
    let requestMatch = false;

    if (req.query.type === 'custom') {

        let myDBData = await getDBData();
        if (myDBData.length === 0) {
            res.contentType("text/plain");
            res.status(404).send("There are no custom questions saved")
        }

        for (let i = 0; i < myDBData.length; i++) {

            let innerKeys = Object.keys(myDBData);
            let innerValues = Object.values(myDBData)

            if (questionID === innerKeys[i]) {

                res.status(200).send(innerValues[i])
            }
        }
    }

    for (let i = 0; i < topics.length - 1; i++) {
        if (req.query.type === topics[i]) {
            topicData = qPoolData[i];
            requestMatch = true;
        }
    }

    if (requestMatch) {
        res.status(200).send(topicData[questionID])
    }

    if(req.query.type === undefined) {
        console.log("An DEA STEHLLE sollte etwas passieren");
        let rnd = getRandom(topics.length - 1);

        topicData = qPoolData[rnd];

        console.log(questionID);

        console.log(topicData[questionID]);
        res.status(200).send(topicData[questionID])

    }

});

router.get('/', async (req, res) => {

    let myArray;
    let arrayindex;
    let myQuestionText;
    let topics = getAllTopics();
    let topicArray;
    let myCustomQuestionArray;
    let myCustomQuestion;

    /*    topics.push('species');
        topics.push('planets');
        topics.push('people');
        topics.push('vehicles');
        topics.push('starships');
        topics.push('films');
        topics.push('custom');*/

    if (req.query.type === undefined) {
        // because kick out custom Topic
        let rnd = getRandom(topics.length - 1);
        let rndTopic = topics[rnd];
        myQuestionText = getQuestionTemplate(rndTopic);
        arrayindex = rnd;
        console.log("HILFE TEST? :D")
    } else if (req.query.type === 'custom') {

        // TODO: GET custom Question from Database
        myCustomQuestionArray = await getDBData();

        if (myCustomQuestionArray.length === 0) {
            res.status(404).send("There are no custom questions saved")
        }

        let rnd = getRandom(myCustomQuestionArray.length)
        myCustomQuestion = myCustomQuestionArray[rnd];

        arrayindex = 6;

    } else for (let i = 0; i < topics.length; i++) {

        if (req.query.type === topics[i]) {

            arrayindex = i;
            // AN der stelle Daten überschreiben
            try {
                topicArray = await getData(baseURL, '/' + topics[i] + '/', '?page=1')
            } catch (err) {
                res.status(500).send(err + "500 Internal Error")
            }

            myArray = overwriteData(topicArray, arrayindex);
            myQuestionText = getQuestionTemplate(topics[i]);

        }

    }

    // Check query for specific response
    /*if (req.query.type === undefined) {
        let rnd = getRandom(topics.length);
        let rndTopic = topics[rnd];
        myQuestionText = getQuestionTemplate(rndTopic);
        arrayindex = rnd;
    } else if (req.query.type === 'custom') {

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
    }*/


    if (arrayindex !== 6) {
        console.log("TESTI 1")

        await cleanUpData();
        console.log("TESTI 2")
        myArray = getAllData();
        console.log("TESTI 3")
        //console.log("MY ARRAY YOOOO \n" + JSON.stringify(myArray[arrayindex],null,2));

        console.log("TESTI 4")
        let myQuestion = await getValue(myArray[arrayindex], myQuestionText.cat, myQuestionText.text, myQuestionText.difficulty);
        console.log("TESTI III ");
        answerArray = [];

        res.status(200).send(myQuestion);

    } else {

        res.status(200).send(myCustomQuestion)
    }

});


router.put('/', async (req, res) => {

    let dbData = await getDBData();
    let innerObject;
    let innerKeys;
    // Clear Editet OBject
    myEditetObject = {};
    let error = false;
    let stockData = await getDBData();
    let match = false;


    if (!req.body.userID || !req.body.qID) {
        error = true;
        res.contentType("text/plain");
        res.status(400).send("| -- Error 400 -- |\n| -- Bad request -- | \n\nINFO: Please adhere to the correct format!\n\nFor further information take a look at the wiki.\nhttps://github.com/Cuhater/WBA2SS19SchuerheckKrennSteffens/wiki/3.-Rest-Modellierung")
    }

    if (!error && !match) {
        innerKeys = Object.keys(stockData);
        let test = Object.values(stockData);
        console.log(JSON.stringify(test) + " TEST :O")

        //for (let i = 0; i < dbData.length; i++) {


        for (let j = 0; j < stockData.length; j++) {
            innerObject = Object.values(stockData[j]);
            let x = innerObject[0];
            console.log("InnerKEys? " + innerKeys)
            if (innerKeys[j] === req.body.qID && !match) {
                console.log(stockData[j])
                console.log(" MATCHALARM == TRUEE JAA  + j : "  + j)
                match = true;
                let jsonObject = {};
                let currentAnswersArray = x[1];
                let currentAnswers = Object.values(currentAnswersArray);

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

                console.log("stockdata b4 splice \n" + stockData)

                stockData.splice(j, 1, myEditetObject);
                console.log("stockdata AFTER splice \n" + stockData)
                // push new Data
                //stockData.push(myEditetObject);

                fs.writeFile('database.json', JSON.stringify(stockData, null, 2), (err) => {
                    if (err) throw err;
                    console.log('The Question were updated!');

                });
            }
            else
            {
                console.log(innerKeys[j] + " ÖH " + req.body.qID)
                console.log(" NO Q WITH DAT ID WAS FOUND")
            }
        }

        /*            console.log("\n UserID: " + x[3]);
                    console.log("req.body: " + req.body.userID);*/


        // USER ID MATCHES
        /*  console.log("MEIN i " + i)
          console.log("DBA Lenght" + dbData.length)

          console.log("x3 === " + x[3])
          console.log("x  req user id " + req.body.userID)*/

        /*            if (x[3] === req.body.userID) {


                        console.log(x[3] + " \nCHECK match\n\n " + req.body.userID)
                        match = true;
                        console.log("mein I : " + i)


         /!*               console.log("INNER KEYS I BRAUCE FOR???  " +innerKeys[i])
                        console.log("INNER REQ ID I BRAUCE FOR???  " + req.body.qID)*!/

                        for (let j = 0; j < innerKeys.length; j++) {
                            console.log("\n \n"+ innerKeys[j]+ "WAS GEHT HIER AB" + req.body.qID+"\n \n \n")
                            console.log("mein J : " + j)
                            if (innerKeys[j] === req.body.qID) {


                                let currentAnswersArray = x[1];
                                console.log(currentAnswersArray);

                                let currentAnswers = Object.values(currentAnswersArray);

                                // Test console log Data
                                /!*console.log("x[0] -> Fragetext :  " + x[0] + "\n");
                                console.log("Antwort 0 : " + currentAnswers[0]);
                                console.log("Antwort 1 : " + currentAnswers[1]);
                                console.log("Antwort 2 : " + currentAnswers[2]);
                                console.log("Antwort 3 : " + currentAnswers[3]);
                                console.log("Richtige Stelle : " + x[2] + "\n");
                                console.log("\n\n --");
                                console.log(req.body.answers.a1);
                                console.log(req.body.answers.a2);
                                console.log(req.body.answers.a3);
                                console.log(req.body.answers.a4);*!/

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
                                console.log("AAAAAAAAAAAAAAAA" +stockData);

                            }
                            else
                            {
                                console.log("ALERM 1 " + innerKeys[j])
                            }
                        }


                        // CHECK IF QUESTION ID MATCH
                        if (innerKeys[i] === req.body.qID) {
                            /!*                      console.log("inner keys" + innerKeys[i]);
                                                    console.log("DB DATA I " + x + "\n");*!/
                            /!*                      console.log("DB DATA 1 " + x[1] + "\n");*!/

                        }
                    }*/
        //}
        if(!match)
        {
            res.contentType("text/plain");
            res.status(401).send("Your are not authorized to apply changes")
        }
        else
        {
            res.status(200).send(stockData);
        }


    }

});

router.post('/', async (req, res, next) => {
    let postedContent = {};
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


    let yourData = [];

    let dbData = [];
    dbData = await getDBData();

    let postedContentArray = [];

    postedContentArray.push(postedContent);

    // TRICKY TRICKY

    console.log("hilfe" + JSON.stringify(dbData, null, 2))
    console.log("auch hilfe" + JSON.stringify(postedContentArray, null, 2))
    yourData = dbData.concat(postedContentArray)

    await saveDBData(yourData);
    res.status(200).send(JSON.stringify(yourData, null, 2));


    /*    fs.readFile('database.json', (err, data) => {
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
        });*/

});

router.delete('/:questionID', async (req, res) => {


    console.log(req.params);
    let requested = req.params["questionID"];
    console.log("REQUESTED" + requested)
    let myDBData = await getDBData();
    let gotEntry = false;
    if (myDBData.length === 0) {
        res.contentType("text/plain");
        res.status(404).send("There are no custom questions saved")
    }
    //Check if userID match

    //console.log(JSON.stringify(myDBData, null, 2))
    for (let i = 0; i < myDBData.length; i++) {

        let innerKeys = Object.values(myDBData);
        console.log("iii ")
        let a = JSON.stringify(innerKeys[i]);

        console.log("aa " + a[0]);
        console.log("aa " + a[1]);
        console.log("aa " + a[2]);
        //console.log("iii "+innerKeys[i])
        //console.log("iii "+innerKeys[2])

        console.log("HIIILFEEE SOS" + a[2] + "\n\n");
        if (requested === a[2]&& !gotEntry) {
            gotEntry = true;
            console.log(" ##### HGAT GEKLAPPT " + requested + " AHH " + innerKeys[i] + " OHHHH " + i)
            /*let innerObject = Object.values(i nnerKeys[i]);

            let x = innerObject[0];

            if (x[3] === req.body.userID) {
                console.log("Stimmt!!!");
            }
            else
            {
                console.log("niete");
            }*/

            myDBData.splice(i, 1);

            fs.writeFile('database.json', JSON.stringify(myDBData, null, 2), (err) => {
                if (err) throw err;
                console.log('The Database were updated!');
            });
            res.status(200).send(myDBData);

        }
        /*        else
                {

                }*/
        // Testing purpose check whats inside object
        /*let innerObject = Object.values(myDBData[i]);
        let x = innerObject[0];
        //console.log("x2" +x[2])
        console.log("\n UserID: " + x[3]);
        console.log("req.body: " + req.body.userID)*/
    }
    if (!gotEntry) {
        res.contentType("text/plain");
        res.status(404).send("Question with QuestionID : " + req.params["questionID"] + " was not found")
    }

});
module.exports = router;


