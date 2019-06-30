var express = require('express');
var router = express.Router();
const https = require('https');
const http = require('http');

/* GET users listing. */
router.get('/', async function (req, res) {

    let myQuery = '';
    let myTopics = await getServerTopics();

    for (let i = 0; i < myTopics.length ; i++) {
        if (req.query.type === myTopics[i]) {
            console.log(myTopics[i] + " AUFGERUFEN")
            myQuery = '?type=' + myTopics[i]
            console.log(myQuery)
        }
    }
    let count = 0;
    let btnTxt = "Play question 1/5"
    let questionArray;
    let quizScore;

    if(req.query.score === undefined)
    {
        quizScore = 0;
    }
    else
    {
        quizScore = req.query.score;
    }
    if (req.query !== {}) {
        questionArray = getLocalQuizArray();
    }

    // TODO : CHECK TYPE - - ?q=0 .. quiz?q=1 ... usw

    if (req.query.question === '1') {
        count = 1;
        btnTxt = "Play question 2/5"
    } else if (req.query.question === '2') {
        count = 2;
        btnTxt = "Play question 3/5"
    } else if (req.query.question === '3') {
        count = 3;
        btnTxt = "Play question 4/5"
    } else if (req.query.question === '4') {
        count = 4;
        btnTxt = "Play question 5/5"
    } else if (req.query.question === '5') {

        let finalQuizScore = quizScore;
        setTimeout(function () {
            res.redirect('/dashboard?score=' + finalQuizScore);
        }, 3000); // 5 seconds
    } else {
        questionArray = await getQuizData(myQuery);
        setLocalQuizArray(questionArray)
    }
    console.log("b4 AWAIT :O")

    let currentQuestion = questionArray[count]
    let questionText = currentQuestion[0];
    let answers = currentQuestion[1];
    let a1 = answers[0]
    let a2 = answers[1]
    let a3 = answers[2]
    let a4 = answers[3]
    let ra = currentQuestion[2]
    let df = currentQuestion[3];

    if (req.query.question !== '5')
    {
        res.render('quiz', {
            qText: questionText,
            qAnswer0: a1,
            qAnswer1: a2,
            qAnswer2: a3,
            qAnswer3: a4,
            ra: ra,
            count: count,
            quizScore: quizScore,
            title: "Random quiz",
            buttonText: btnTxt,
            df: df
        });

    }
});

module.exports = router;
