var express = require('express');
var router = express.Router();
const https = require('https');
//let finalObject = [];
//let ultraArray = [];
const functions = require('../public/javascripts/functions')

let myEditetObject = {}
var postedContent = {} // empty Object
let newArray = []


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

        // Potenzieller eq code
        let randomTopic;
        randomTopic = getRandomTopic();

        myQuestionText = getQuestionTemplate(randomTopic[0]);
        arrayindex = randomTopic[1];


       /* let rnd = getRandom(topics.length)
        let rndTopic = topics[rnd]
       // console.log("MY RND" + rnd);
       // console.log("MY TOPIC " + rndTopic)
        myQuestionText = getQuestionTemplate(rndTopic);
        arrayindex = rnd;*/
    }
    else if(req.query.type === 'custom')
    {

        // TODO: GET custom Question from Database
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

getDBData = () => {
    let counter = 0;
    return new Promise((resolve, reject) => {
    fs.readFile ('database.json',  (err, data) => {

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
       // console.log("CNTR" + counter)
        resolve(isThereData)
         })
    })

}


router.put('/', async (req, res, next) => {

    //console.log("HALLO PUT HERE");
    let dbData = await getDBData();
    let innerObject
    let innerKeys

    let error = false;

    let stockData = await getDBData();



    if(!req.body.userID || !req.body.qID)
    {
        console.log("EEEEHRRRRRRRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        error = true;
        //let errormsg = " -- Error 400 -- \n" + "Please adhere to the correct format!\n" + "For further information take a look at the wiki.\n" + "https://github.com/Cuhater/WBA2SS19SchuerheckKrennSteffens/wiki/3.-Rest-Modellierung"

        //console.log(errormsg);
        //res.writeHead(400, { 'Content-Type': 'text/plain' });

        res.contentType("text/plain")
        res.status(400).send("| -- Error 400 -- |\n| -- Bad request -- | \n\nINFO: Please adhere to the correct format!\n\nFor further information take a look at the wiki.\nhttps://github.com/Cuhater/WBA2SS19SchuerheckKrennSteffens/wiki/3.-Rest-Modellierung")
    }

    if(!error)
    {
        console.log(dbData.length);

        innerKeys = Object.keys(dbData)

        for (let i = 0; i < dbData.length; i++) {
            innerObject = Object.values(dbData[i])

            let x = innerObject[0];
            //console.log("x2" +x[2])
            console.log("\n UserID: " +x[3])
            console.log("req.body: " + req.body.userID)


            // USER ID MATCHES




            if(x[3] === req.body.userID){


                // CHECK IF QUESTION ID MATCH

                if (innerKeys[i] === req.body.qID)
                {
                    console.log("inner keys" + innerKeys[i])
                    console.log("DB DATA I " + x + "\n")

                    console.log("DB DATA 1 " + x[1] + "\n");
                    let currentAnswersArray = x[1];
                    console.log(currentAnswersArray);

                    let currentAnswers = Object.values(currentAnswersArray)

                    console.log("x[0] -> Fragetext :  " + x[0] + "\n")
                    console.log("Antwort 0 : " + currentAnswers[0])
                    console.log("Antwort 1 : " + currentAnswers[1])
                    console.log("Antwort 2 : " + currentAnswers[2])
                    console.log("Antwort 3 : " + currentAnswers[3])
                    console.log("Richtige Stelle : " + x[2] + "\n");



                    console.log("\n\n --")
                    console.log(req.body.answers.a1);
                    console.log(req.body.answers.a2);
                    console.log(req.body.answers.a3);
                    console.log(req.body.answers.a4);



                    let jsonObject = {};
                    jsonObject["a1"] = req.body.answers.a1;
                    jsonObject["a2"] = req.body.answers.a2;
                    jsonObject["a3"] = req.body.answers.a3;
                    jsonObject["a4"] = req.body.answers.a4;

                    console.log("JSONOBJEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEECT" + JSON.stringify(jsonObject, null,2));

                    x[0] = req.body.text;
                    currentAnswers[0] = req.body.answers.a1;
                    currentAnswers[1] = req.body.answers.a2;
                    currentAnswers[2] = req.body.answers.a3;
                    currentAnswers[3] = req.body.answers.a4;
                    x[2] = req.body.right;


                    let c = req.body.qID;
                    console.log("cccccc : " + c.toString())

                    //postedContent[counter] = []; // empty Array, which you can push() values into

                    //let myEditedAnswers = [];
                    //myEditedAnswers.push(currentAnswers[0]);


                    myEditetObject[c] = [];

                    myEditetObject[c].push(x[0]);
                    myEditetObject[c].push(jsonObject);
                    myEditetObject[c].push(x[2])
                    myEditetObject[c].push(req.body.userID)


                    console.log("####### AAA OOO UUU \n " + myEditetObject + "\n AAA UUU OOO");
                    console.log("####### AAA OOO UUU \n " + JSON.stringify(myEditetObject) + "\n AAA UUU OOO");
                    console.log(currentAnswers + " curr ans ")


                    console.log("KOMM SCHON ÜBELST AM SHEPPERN HIER" + currentAnswers[0]);
                    console.log("iiiiiiiiiiiiii" + i)


                    console.log("OOOOOOOOLD DATAAH" + dbData);

                    //splice starting at postition i and remove 1 element
                    stockData.splice(i, 1);
                    console.log("OOOOOOOOLD DATAAH NNEUUUUUU" + dbData);
                    //newArray.push(myEditetObject)

                    stockData.push(myEditetObject)
                    /* for (let j = 0; j < x[1].length; j++) {
                         let objectAnswers = x[1];
                         console.log("ANTWORTEN :) ->"+ objectAnswers)
                     }*/
                    fs.writeFile('database.json', JSON.stringify(stockData, null, 2), (err) => {
                        if (err) throw err;
                        console.log('The Question were updated!');
                    });



                    console.log("ICH RASTEEE AUSSSSSSSSSS JAAAAAA HALB 4 AB GEHTS HIER :D")





                }
               /* console.log("ALAAAAAAAAHAAARM ########## \n")

                console.log("InrRRRRRRRRRRRRRRRRRRRRRRRRRR"  + innerKeys[i])*/

                /*let keys = Object.keys(dbData);

                for (let i = 0; i < keys.length; i++) {
                    console.log(req.body.qID);
                    console.log(Object.keys(dbData[i]));
                    if(req.body.qID === keys[i])
                    {
                        console.log("TREFFFFFFFFFER");
                        console.log('match: ', keys[i])




                    }
                }*/


            }



        }

      /*  console.log("INNNAAA " + innerObject);


        let aa = Object.values(dbData[1])
        console.log("AAA \n" + aa)

        console.log("AAA \n" + aa[0])

        let bb = aa[0];

        //console.log("\n BB0 \n" + bb[0])
        //console.log("\n BB1 \n" + bb[1])
        console.log("\n BB2 \n" + bb[2])
        console.log("\n BB3 \n" + bb[3])


        let myTest = Object.keys(dbData[0])

        console.log(" \n \n MY TEST \n" + JSON.stringify(myTest));*/

        res.status(200).send(stockData);
    }




})

router.post('/', async (req, res, next) => {
    let counterr = await getDBData();
    let counter = counterr.length;




    console.log("TEST TEST " + counter);

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

router.delete('/:questionID', async (req, res, next) => {


    console.log(req.params);

    console.log("DELETE ressource aufgerufen :) ");


    let myDBData = await getDBData();
    let myNewDB;
    console.log(myDBData.length);


    //Check if userID match
    for (let i = 0; i < myDBData.length; i++) {

        console.log("QID ######### " + req.params["questionID"]);
        console.log("VALUUUUUTZ ######### " + Object.values(myDBData[i]));
        let innerKeys = Object.keys(myDBData)
        if(req.params["questionID"] === innerKeys[i])
        {

            console.log(i +" STELLE DER FRAGE?")
            console.log("alaarm \n \n");

            myDBData.splice(i,1)


            fs.writeFile('database.json', JSON.stringify(myDBData, null, 2), (err) => {
                if (err) throw err;
                console.log('The Database were updated!');
            });


        }


        let innerObject = Object.values(myDBData[i])


        console.log("innerObject " + Object.keys(myDBData[i]));

        let x = innerObject[0];
        //console.log("x2" +x[2])
        console.log("\n UserID: " +x[3])
        console.log("req.body: " + req.body.userID)

    }

    res.status(200).send(myDBData);
})


module.exports = router;


