var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/', async (req, res, next) => {




    let questionPool = await getQuestionPoolData();
    console.log('This is after gettin data in quiz.js');
    console.log(questionPool)
    let myQuiz = [];

    let quizSize = 5;


    let topics = getAllTopics();

    if(req.query.type === undefined){

    }

    for (let i = 0; i < topics.length; i++) {

        console.log(topics[i]);

        if(req.query.type === topics[i])
        {
            let topicData = questionPool[i]



            for (let j = 0; j < quizSize ; j++) { // Sagen wir 5 Fragen im Q

                let rnd = getRandom(topicData.length);
                myQuiz.push(topicData[rnd])
            }
        }

    }


    if(req.query.type === undefined){
        // TODO : Shakker randomtopicQuiz? :D


        console.log("hallo");
        let rndTopic = getRandom(topics.length)

        let rndTopicData = questionPool[rndTopic]

        for (let i = 0; i < quizSize; i++) {
            let rnd = getRandom(rndTopicData.length);
            myQuiz.push(rndTopicData[rnd])
        }

    }


    console.log("Hallo hier kommen die Quizze hin :>");
    res.status(200).send(myQuiz);
});


module.exports = router;


