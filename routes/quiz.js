var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/', async (req, res) => {


    let questionPool = await getQuestionPoolData();
    console.log('This is after gettin data in quiz.js');
    console.log(questionPool)
    let myQuiz = [];
    let isCustom = false;
    let customDataEntries;
    let quizSize = 5;


    let topics = getAllTopics();


    if (req.query.type === 'custom') {
        isCustom = true;

        let customDataArray = await getDBData()
        customDataEntries = Object.values(customDataArray);
        //console.log("customDataArray" + customDataEntries);


        for (let j = 0; j < quizSize; j++) {

            let rnd = getRandom(customDataEntries.length)
            myQuiz.push(customDataEntries[rnd])
        }
        res.status(200).send(myQuiz)
    }

    for (let i = 0; i < topics.length - 1; i++) {

        //console.log(topics[i]);


        if (req.query.type === topics[i] && !isCustom) {
            let topicData = questionPool[i]


            for (let j = 0; j < quizSize; j++) { // Sagen wir 5 Fragen im Q

                let rnd = getRandom(topicData.length);
                myQuiz.push(topicData[rnd])
            }
        }

    }


    if (req.query.type === undefined) {


        console.log("hallo");


        for (let i = 0; i < quizSize; i++) {
            let rndTopic = getRandom(topics.length - 1)
            let rndTopicData = questionPool[rndTopic]
            let rnd = getRandom(rndTopicData.length);
            myQuiz.push(rndTopicData[rnd])
        }

    }


    console.log("Hallo hier kommen die Quizze hin :>");
    if (!isCustom) {
        res.status(200).send(myQuiz);
    }


});


module.exports = router;


