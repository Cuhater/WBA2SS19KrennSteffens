var express = require('express');
var router = express.Router();
const https = require('https');
//let finalObject = [];
//let ultraArray = [];
const functions = require('../public/javascripts/functions')


var postedContent = {} // empty Object
var keyy = 0;


const fs = require('fs');


router.get('/',async (req, res, next) => {


    let myArray = getAllData();
    let myCustomArray = [];
    let arrayindex;
    let myQuestionText;
    let topics = [];

    topics.push('species');
    topics.push('planets');
    topics.push('people');
    topics.push('vehicles');
    topics.push('starships');
    topics.push('films');
    //topics.push('custom');



    // Check query for specific response
    if(req.query.type === undefined){
        let rnd = getRandom(topics.length)
        let rndTopic = topics[rnd]
       // console.log("MY RND" + rnd);
       // console.log("MY TOPIC " + rndTopic)
        myQuestionText = getQuestionTemplate(rndTopic);
        arrayindex = rnd;
    }
    else if(req.query.type === 'custom')
    {
        myQuestionText = getQuestionTemplate("custom");
        arrayindex = 6;
    }
    else if(req.query.type === 'species')
    {
        myQuestionText = getQuestionTemplate("species");
        arrayindex = 0;
    }
    else if(req.query.type === 'planets')
    {
        myQuestionText = getQuestionTemplate("planets");
        arrayindex = 1;
    }
    else if(req.query.type === 'people')
    {
        myQuestionText = getQuestionTemplate("people");
        arrayindex = 2;
    }
    else if(req.query.type === 'vehicles')
    {
        myQuestionText = getQuestionTemplate("vehicles");
        arrayindex = 3;
    }
    else if(req.query.type === 'starships')
    {
        myQuestionText = getQuestionTemplate("starships");
        arrayindex = 4;
    }
    else if(req.query.type === 'films')
    {
        myQuestionText = getQuestionTemplate("films");
        arrayindex = 5;
    }
    else
    {
        myQuestionText = getQuestionTemplate("species");
        console.log("LEIDER DEN ERROR PART ERWISCHT :(((")
        arrayindex = 0;

        console.log("ERROR")
    }

/*    for (let n = 0; n < myArray[arrayindex].length; n++)
    {
        console.log("\n"+myArray[arrayindex][n].name);
    }*/


    //console.log("------------------------MY GET VALUE SHIIIED" + myArray[arrayindex[0]]);
    let myQuestion = await getValue(myArray[arrayindex], myQuestionText.cat, myQuestionText.text);

    res.status(200).send(myQuestion);

});

router.post('/', async (req, res, next) => {

    let counter = 0;

    await fs.readFile('database.json', (err, data) => {
        if (err) throw err;
        let isThereData = JSON.parse(data);



/*        for (let i = 0; i < isThereData.length; i++) {

            console.log("is there Data???" + JSON.stringify(Object.keys(isThereData)[i]));

             counter = JSON.stringify(Object.keys(isThereData)[i])
        }
        let int = parseInt(counter) + 1;
        console.log("MEIN SCHEISSE Zahl : " + int);



        console.log("IS THERE DATA? LENGHT " + isThereData.length);*/

        counter = isThereData.length;
        console.log("CNTR" + counter)
    });


    console.log("CNTRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR" + counter)
    postedContent[counter] = []; // empty Array, which you can push() values into



    let customQuestionText = "";
    let customQuestonAnswers = [];
    let customQuestionRaInteger;

    // Fragetext vorhanden?
    if(req.body.text !== undefined)
    {
        postedContent[counter].push(req.body.text);
    }
    if(req.body.answers !== undefined)
    {
        postedContent[counter].push(req.body.answers);
        customQuestonAnswers.push(req.body.answers.a1)
        customQuestonAnswers.push(req.body.answers.a2)
        customQuestonAnswers.push(req.body.answers.a3)
        customQuestonAnswers.push(req.body.answers.a4)


/*        console.log(customQuestonAnswers[0] + " stelle 0");
        console.log(customQuestonAnswers[1] + " stelle 1");
        console.log(customQuestonAnswers[2] + " stelle 2");
        console.log(customQuestonAnswers[3] + " stelle 3");*/
    }
    if(req.body.right !== undefined)
    {
        postedContent[counter].push(req.body.right);
    }
    postedContent[counter].push(req.body.userID);




    // TODO CQ - Counter einbauen um auf ID's zuzugreifen :)


    // TODO : Write custom Q insto Database

    // TODO TODOOOHOOO -> Später -> put, post, delete custom questions if authorized uID = uID usw :D :)

    //key++;

    //let postData = JSON.stringify(customQuestion, null, 2);

    //let postData = postedContent[keyy];

    //let aData = []

  /*  fs.readFile('database.json', (err, data) => {
        if (err) throw err;
        let currentData = {};
        currentData[key] = []
        currentData[key].push(JSON.parse(data));

        console.log("test");
        console.log(currentData)
        let nigger = [];
        nigger.push(JSON.stringify(postedContent))
        console.log(postedContent);
        console.log(postedContent[keyy]);

        //aData.push(currentData)
/!*

        console.log("'HHHHHHHHHHHHHHHHHHHHHHHHHHHH'.log");

        console.log(aData);
        console.log("'HHHHHHHHHHHHHHHHHHHHHHHHHHHH'.log");
        console.log(postData);
        console.log("MY CQK \n\n" + customQuestion[key]);
*!/

        let aData = currentData.concat(JSON.parse(data))
        let x = JSON.stringify(aData, null, 2);
        fs.appendFile('database.json', x, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });*/


    //let postData = JSON.stringify(customQuestion, null, 2);

    let myData = [];;
        fs.readFile('database.json', (err, data)=> {
            if (err) throw err;
            let dbData = JSON.parse(data);
            console.log(dbData);


            //let a = [];
            let b = [];
            //a.push(JSON.stringify(dbData, null, 2));
            //b.push(JSON.stringify(postedContent, null, 2));
            //a.push(dbData)
            b.push(postedContent)
            /*myData.push(dbData);
            myData.push(b);
            */
            myData = dbData.concat(b)


            fs.writeFile('database.json', JSON.stringify(myData, null, 2), (err) => {
                if (err) throw err;
                console.log('The Database were updated!');
            });

            res.status(200).send(JSON.stringify(myData, null , 2));
        });


/*    });*/





});

module.exports = router;


