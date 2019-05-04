var express = require('express');
var router = express.Router();
const https = require('https');
let finalObject = [];

router.get('/', async (req, res, next) => {
    //Setting up BaseURL
    let baseURL = 'https://swapi.co/api'
    //Get all species Data
    let species_all = await getData(baseURL, '/species/', '?page=3')
    console.log("\n\n### Finish getData Routine ###")
    //Create a Question
    let myQuestion = await getValue(species_all, "skin_colors");
    //Send Question as Object to the Client
    res.status(200).send((myQuestion))
});
function makeQuestion(question, answers) {
    //TODO Question erstellen als eigene Methode bereitstellen
}
function makeQuiz (){
    //TODO Fragen in Quiz zusammenfügen
}

//Hilfsmethode um zufällige Zahl zu erstellen
function getRandom(range) {
    return Math.floor(Math.random()* range)
}


function getValue(object, propertyName) {
    return new Promise((resolve, reject) => {
    //console.log('Try to get name');
    //console.log('object' + JSON.stringify(object.length));
    //console.log('test' + (object.length));
    let testi = []
    let rnd1 = getRandom(object.length)
    let rnd2 = getRandom(object.length)
    let rnd3 = getRandom(object.length)

    let ra = getRandom(5)

    //console.log("RIGHT ANSWER " + ra);
    //console.log("Answer 1 " + rnd1);
    //console.log("Answer 2 " + rnd2);
    //console.log("Answer 3 " + rnd3);

    let rnd = Math.floor(Math.random() * object.length + 1)
    //Get all Values
    for(let i= 0; i< object.length; i++)
    {
        var obj = object[i]
        //console.log(propertyName);
        //console.log("Klappts???" +obj[propertyName])
        testi[i] = obj[propertyName]
    }
    //console.log("RND NAME ?" + object[rnd].name + "RND RND " + rnd + "RND RND SKIN" + object[rnd][propertyName]);
    //console.log("Which Skincolor got the spezies : '" + object[rnd].name + "' ?")
    // answers = Question, A1, A2, A3, A4, Integer
    let question = [];
    //console.log("ANSWER 1: " + testi[rnd1]);
    //console.log("ANSWER 2: " + testi[rnd2]);
    //console.log("ANSWER 3: " + testi[rnd3]);
    //console.log("ANSWER 4: " + testi[rnd] + "\n\n");
    //console.log(" RIGHT A " + ra)
    // Pushing Question in Object for testing purpose
        question.push("Which Skincolor got the species : '" + object[rnd].name + "' ?")

    // Prepare answer Block
    for(let x = 1; x < 5 ; x++)
    {
        if(x === ra)
        {
            question.push(testi[rnd])
            //console.log("HALLO JAMOIN MEINE FRAGE IS GLEICH RA" + ra + x);
        }
        else
        {
            question.push(testi[getRandom(object.length)])
        }
    }
        question.push(ra);
    for(let y = 0; y < 4; y++)
    {
        console.log(question[y]);
    }



    console.log("RIGHT ANSWER: " + object[rnd].skin_colors )

        resolve(question)

        if(error){
            reject(error)
        }
    })
}
function getData(url, path, parameter, currentObjects) {
    //console.log("Starting  get Call on Path [extern API] : " + url + path + parameter + "\n\n")

    //Return new Promise to guarantee right Process timing
    return new Promise((resolve, reject) => {


        if (currentObjects !== undefined) {
            finalObject = finalObject.concat(currentObjects);
        }
        else
        {
            console.log("Finish get Call on Path [extern API] : " + url + path + parameter + "\n\n")
        }
        if (parameter === undefined) { parameter = '' }
        if (path === undefined) { path = '' }
        https.get(url + path + parameter, (res) => {
            let str = '';

            //Response on Data
            res.on('data', function (chunk) {
                str += chunk
            });

            //On Respond End
            res.on('end', async function () {
                let jsonObject = JSON.parse(str);

                //If more Pages are available start async recursive getData call
                if (jsonObject.next !== null) {
                    //preparedObject = jsonObject.results
                    console.log("Finish get Call next Path [extern API] : " + jsonObject.next + "\n\n")
                    resolve(await getData(jsonObject.next, '', '', jsonObject.results))
                } else {
                    //Concat Final Object with last results
                    finalObject = finalObject.concat(jsonObject.results)
                    resolve(finalObject)
                }
            });
            // On Error reject Promise
            res.on('error', function (error) {
                reject(error);
            })
        });
    })
}
module.exports = router;


