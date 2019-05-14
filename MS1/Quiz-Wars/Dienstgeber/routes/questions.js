var express = require('express');
var router = express.Router();
const https = require('https');
let finalObject = [];
let ultraArray = [];

router.get('/',async (req, res, next) => {

    //SETUP: BaseURL to get Data from
    let baseURL = 'https://swapi.co/api'
    //INIT: Get all Data from API
    let species_all = await getData(baseURL, '/species/', '?page=1')
/*    let planets_all = await getData(baseURL, '/planets/', '?page=1')
    let vehicles_all = await getData(baseURL, '/vehicles/', '?page=1')
    let people_all = await getData(baseURL, '/people/', '?page=1')
    let starships_all = await getData(baseURL, '/starships/', '?page=1')
    let films_all = await getData(baseURL, '/films/', '?page=1')*/

    ultraArray.push(species_all);
/*  ultraArray.push(planets_all);
    ultraArray.push(vehicles_all);
    ultraArray.push(people_all);
    ultraArray.push(starships_all);
    ultraArray.push(films_all);*/
    console.log("\n\n### Finish getData Routine ###")

    console.log("HILFE :D ");

    //console.log(ultraArray.species_all)
    //console.log(ultraArray[0])

    console.log("MIESE");


/*   console.log(getQuestionText("species"));
   console.log(getQuestionText("planets"));*/

   let testi = getQuestionText("species");
    console.log("ÖHHHHHHHHHHHHHHH");
    console.log(testi.cat)
    console.log(testi);

    let myQuestionText = getQuestionText("species");
    let myQuestion = await getValue(ultraArray[0], myQuestionText.cat, myQuestionText.text);

    res.status(200).send(myQuestion);

});



function getQuestionText(category){


    let speciesQuestions = [];

    let speciesText = [];
    let peopleText = [];
    let planetsText = [];
    let vehicleText = [];
    let starshipText = [];
    let filmsText = [];


    // Sample QuestionText ## Species ##
    speciesText.push({text :"Which Skincolor(s) got the species", cat: "skin_colors"});
    speciesText.push({text :"Which Language(s) speak the species", cat: "language"});
    speciesText.push({text :"Which average Lifespan got the species", cat: "average_lifespan"});

    // Sample QuestionText ## People ##
    peopleText.push({text: "Which Haircolor got", cat: "hair_color"});
    peopleText.push({text: "Which Homeworld got", cat: "homeworld"});
    peopleText.push({text: "Which gender got", cat: "gender"});

    // Sample QuestionText ## Planets ##
    planetsText.push({text :"Which Clima got the Planet", cat: "climate"});
    planetsText.push({text :"Which Terrain got the Planet", cat: "terrain"});
    planetsText.push({text :"Which population got the Planet", cat: "population"});

    // Sample QuestionText ## Vehicles ##
    vehicleText.push({text: "Which Vehicleclass got", cat: "vehicle_class"});
    vehicleText.push({text: "Which Lenght in (m) got", cat: "length"});
    vehicleText.push({text: "How big have to be the Crew of", cat: "crew"});

    // Sample QuestionText ## Starships ##
    starshipText.push({text :"Which Starshipclass got", cat: "starship_class"});
    starshipText.push({text :"How many Passengers can carry", cat: "language"});
    starshipText.push({text :"How Expensive (in Credits) is ", cat: "cost_in_credits"});

    // Sample QuestionText ## Films ##
    filmsText.push({text: "Which episode got", cat: "episode_id"});
    filmsText.push({text: "Who is the Director of", cat: "director"});
    filmsText.push({text: "When came out", cat: "realease_date"});

    //
    /*console.log(speciesText);
    console.log(peopleText);*/
    if(category === "species")
    {
        let rnd = getRandom(speciesText.length);
        return speciesText[rnd];
    }
    else if(category === "people")
    {
        let rnd = getRandom(peopleText.length);
        return peopleText[rnd];
    }
    else if(category === "planets")
    {
        let rnd = getRandom(planetsText.length);
        return planetsText[rnd];
    }
    else if(category === "vehicles")
    {
        let rnd = getRandom(vehicleText.length);
        return vehicleText[rnd];
    }
    else if(category === "starships")
    {
        let rnd = getRandom(starshipText.length);
        return starshipText[rnd];
    }
    else if(category === "films")
    {
        let rnd = getRandom(filmsText.length);
        return filmsText[rnd];
    }
    else
    {
        console.log("ERROR");
    }






/*    let questionTexts = [];
    let cat = category;
    let text = [];
    text.push("Which Skincolor got the species XY");
    text.push("species");


    for(let i = 0; i <= text.length; i++)
    {
        questionTexts.push(text[i])
    }

    let rnd = getRandom(questionTexts.length);
    return questionTexts[rnd];*/


}


function getQuestionConstruct (){




    return question;
}




//Hilfsmethode um zufällige Zahl zu erstellen
function getRandom(range) {
    return Math.floor(Math.random()* range)
}


function getValue(object, propertyName, questionText) {
    return new Promise((resolve, reject) => {
        //console.log('Try to get name');
        //console.log('object' + JSON.stringify(object.length));
        //console.log('test' + (object.length));
        let testi = []
        let rnd1 = getRandom(object.length)
        let rnd2 = getRandom(object.length)
        let rnd3 = getRandom(object.length)

        let ra = getRandom(4)

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
        question.push(questionText + object[rnd].name + "' ?")

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



        //console.log("RIGHT ANSWER: " + object[rnd].skin_colors )

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


