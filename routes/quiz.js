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
        myQuery = ''
        console.log(myQuery)
    }
*/








    let data = '';

    let recievedQuestionArray = [];
    let count = 0;
    let btnTxt = "Play question 1/5"
    let questionArray;
    let quizScore

    if(req.query.score === undefined)
    {
        quizScore = 0;
    }
    else
    {
        quizScore = req.query.score;
    }


/*    if(req.query.score === '1'){
        quizScore = 1;
    }
    else if(req.query.score === '2'){
        quizScore = 2;
    }
    else if(req.query.score === '3'){
        quizScore = 3;
    }
    else if(req.query.score === '4'){
        quizScore = 4;
    }
    else if(req.query.score === '5'){
        quizScore = 5;
    }
    else
    {
        console.error("kein score");
        quizScore = 0;
    }*/






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
        console.log(" \n\n YOU GOT "+ finalQuizScore + " POINTS YOO \n\n")
        // TODO : HEEEEEEEEEERE TOOOOODO GO ON 
        setTimeout(function () {
            res.redirect('/dashboard?score=' + finalQuizScore);

            //alert("HIER WAS MACHEN ")
        }, 3000); // 5 seconds
    } else {
        questionArray = await getQuizData(myQuery);
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
    let df = currentQuestion[3];

    console.log("\n\n\n HAHAHAHA \n " +df)


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
            quizScore: quizScore,
            title: "Random quiz",
            buttonText: btnTxt,
            df: df
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
