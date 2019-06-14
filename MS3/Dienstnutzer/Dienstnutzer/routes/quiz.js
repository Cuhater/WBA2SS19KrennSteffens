var express = require('express');
var router = express.Router();
const https = require('https');
const http = require('http');

/* GET users listing. */
router.get('/', async function (req, res) {
    let data = '';
    let myQuery = '';
    let recievedQuestionArray = [];
    let count = 0;
    let btnTxt = "Play question 1/5"
    let questionArray;



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

        // TODO : HEEEEEEEEEERE TOOOOODO GO ON 
        setTimeout(function () {
            alert("HIER WAS MACHEN ")
        }, 3000); // 5 seconds
    } else {
        questionArray = await getQuizData();
        setLocalQuizArray(questionArray)
    }
    console.log("b4 AWAIT :O")


    // TODO : GET QUIZ AS OBJECT


    let currentQuestion = questionArray[count]

    let questionText = currentQuestion[0];

    let answers = currentQuestion[1];
    let a1 = answers[0]
    let a2 = answers[1]
    let a3 = answers[2]
    let a4 = answers[3]
    let ra = currentQuestion[2]


    //let innerKey = Object.keys(data)
    /*    console.log(jsonData.length)
        console.log(jsonData[0])
        console.log(jsonData[1])
        console.log(jsonData[2])

        let anserws = jsonData[1];*/
    /*            let a0 = anserws[0]
                let a1 = anserws[1]
                let a2 = anserws[2]
                let a3 = anserws[3]*/

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
            title: "Random quiz",
            buttonText: btnTxt
        });

    }



    // TODO : Wenn nix, dann gib ihm GET auf Quiz

    // TODO : in quiz todo save Data local und hoffe das die bleiben xD
    /*   await http.get('http://localhost:3000/quiz', (resp) => {


           // A chunk of data has been recieved.
           resp.on('data', (chunk) => {
               data += chunk;
               console.log("I GOT DATA")
           });

           // The whole response has been received. Print out the result.
           resp.on('end', () => {
               //console.log(JSON.parse(data));
               recievedQuestionArray = JSON.parse(data);

               console.log("WACKEN IS VORBEI IHR RIPPER");



           });

       }).on("error", (err) => {
           console.log("Error: " + err.message);
       });

   */

});

module.exports = router;
