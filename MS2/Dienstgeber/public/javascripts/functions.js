const express = require('express')
const functions = express()
const https = require('https');
let finalObject = [];
let ultraArray = [];
let a = 0;
let questionPool = [];

myFunction = async () => {

  /*  //SETUP: BaseURL to get Data from
    let baseURL = 'https://swapi.co/api'
    //INIT: Get all Data from API

    let species_all;
    let planets_all;

    species_all = await getData(baseURL, '/species/', '?page=4')
    ultraArray.push(species_all); // 0
    finalObject = []

    planets_all = await getData(baseURL, '/planets/', '?page=6')
    ultraArray.push(planets_all); // 1
    finalObject = []

    let people_all = await getData(baseURL, '/people/', '?page=7')
    ultraArray.push(people_all);
    finalObject = []

    let vehicles_all = await getData(baseURL, '/vehicles/', '?page=4')
    ultraArray.push(vehicles_all);
    finalObject = []

    let starships_all = await getData(baseURL, '/starships/', '?page=2')
    ultraArray.push(starships_all);
    finalObject = []

    let films_all = await getData(baseURL, '/films/', '?page=1')
    ultraArray.push(films_all);
    finalObject = []*/

    console.log("\n\n### Finish init Routine ###")
    console.log("\n\n##### System is waiting for incoming Requests #####")
}

getAllData = () => {
    return ultraArray;
}

getQuestionTemplate = (category) => {

    //let speciesQuestions = [];

    let speciesText = [];
    let peopleText = [];
    let planetsText = [];
    let vehicleText = [];
    let starshipText = [];
    let filmsText = [];

    // Sample QuestionText ## Species ##
    speciesText.push({text: "Which Skincolor(s) got the species", cat: "skin_colors"});
    speciesText.push({text: "Which Language(s) speak the species", cat: "language"});
    speciesText.push({text: "Which average Lifespan got the species", cat: "average_lifespan"});

    // Sample QuestionText ## People ##
    peopleText.push({text: "Which Haircolor got", cat: "hair_color"});
    peopleText.push({text: "Which Homeworld got", cat: "homeworld"});
    //peopleText.push({text: "Which gender got", cat: "gender"});

    // Sample QuestionText ## Planets ##
    planetsText.push({text: "Which Clima got the Planet", cat: "climate"});
    planetsText.push({text: "Which Terrain got the Planet", cat: "terrain"});
    planetsText.push({text: "Which population got the Planet", cat: "population"});

    // Sample QuestionText ## Vehicles ##
    vehicleText.push({text: "Which Vehicleclass got", cat: "vehicle_class"});
    vehicleText.push({text: "Which Lenght in (m) got", cat: "length"});
    vehicleText.push({text: "How big have to be the Crew of", cat: "crew"});

    // Sample QuestionText ## Starships ##
    starshipText.push({text: "Which Starshipclass got", cat: "starship_class"});
    starshipText.push({text: "How many Passengers can carry", cat: "passengers"});
    starshipText.push({text: "How Expensive (in Credits) is ", cat: "cost_in_credits"});

    // Sample QuestionText ## Films ##
    filmsText.push({text: "Which episode got", cat: "episode_id"});
    filmsText.push({text: "Who is the Director of", cat: "director"});
    filmsText.push({text: "When came out", cat: "realease_date"});

    if (category === "species") {
        let rnd = getRandom(speciesText.length);
        return speciesText[rnd];
    } else if (category === "people") {
        let rnd = getRandom(peopleText.length);
        return peopleText[rnd];
    } else if (category === "planets") {
        let rnd = getRandom(planetsText.length);
        return planetsText[rnd];
    } else if (category === "vehicles") {
        let rnd = getRandom(vehicleText.length);
        return vehicleText[rnd];
    } else if (category === "starships") {
        let rnd = getRandom(starshipText.length);
        return starshipText[rnd];
    } else if (category === "films") {
        let rnd = getRandom(filmsText.length);
        return filmsText[rnd];
    } else {
        console.log("ERROR");
    }
}

getRandom = (range) => {
    return Math.floor(Math.random() * range)
}


getValue = (dataSource, category, questionText) => {
    return new Promise((resolve, reject) => {

        // Prepare Array to gather all possible Answers
        let allAnswersOfTopic = []

        // Get INT 0-3 for the Position of the right Answer
        let rightAnswerPosition = getRandom(4)
        //console.log(" DIE STELLE DER RICHTIGEN ANTWORT " + rightAnswerPosition);

        // Get rnd INT in length of used Data Source
        let rnd = Math.floor(Math.random() * dataSource.length)

        //Get all Values
        // Für alle Einträge der Liste "dataSource" in "allAnswersOfTopic" speichern
        for (let i = 0; i < dataSource.length; i++) {

            let obj = dataSource[i]
            allAnswersOfTopic[i] = obj[category]
        }


        //console.log("#################### AA Lenght" + allAnswersOfTopic.length);
        //console.log("#################### DA LENGHT" + dataSource.length);


        // TODO: Vor dem zusammenbasteln der UltraArray packen :3
        // Clean / gray / grey issue
        // CLean Null or undefined parameter
        /*        if (category === 'vehicles') {*/
        for (let x = 0; x < dataSource.length; x++) {
            console.log(allAnswersOfTopic[x]);


            if (allAnswersOfTopic[x] === undefined) {
                allAnswersOfTopic[x] = 'undefined';
            }

            if (allAnswersOfTopic[x].includes("gray")) {
                allAnswersOfTopic[x].replace('gray', 'grey')
            }

        }
        /*        }*/


        // Create QuestionObject
        let question = [];
        // Pushing Question Text to first index of Array

        let isUnknown = false;


        // Test dataSource of "unknown" Data and re-random it ? :D
        if (dataSource[rnd].name === "unknown") {

            isUnknown = true;
            while (isUnknown) {
                rnd = Math.floor(Math.random() * dataSource.length)
                isUnknown = false;
            }
        }


        question.push(questionText + " " + dataSource[rnd].name + " ?")
        // --> question[0] = "Fragetext"


        // Prepare answer Block

        let answers = [];


        let bool = false;

        // Allokiere zufällige Antwort aus Antwortpool
        let randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
        //console.log(randomAnswer + " FIRRRRST RND ANSW")


        // Für 4 Antwortmöglichkeiten
        for (let u = 0; u <= 3; u++) {


            let rndAnswerPushed = false;

            // Wenn U der selbe INT ist wie RA Position
            if (u === rightAnswerPosition) {

                answers.push(allAnswersOfTopic[rnd])

            } else {


                if (answers.length === 0 && randomAnswer !== allAnswersOfTopic[rnd]) {
                    answers.push(randomAnswer)
                } else {

                    for (let t = 0; t <= u; t++) {
                        if (!rndAnswerPushed) {

                            while (randomAnswer === answers[0] || randomAnswer === answers[1] || randomAnswer === answers[2] || randomAnswer === allAnswersOfTopic[rnd] || bool === false) {
                                randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
                                console.log("Neu generierte Antwort: " + randomAnswer);

                                bool = true;
                            }
                            if (bool) {

                                answers.push(randomAnswer)
                                rndAnswerPushed = true;
                                bool = false;

                            }
                        }

                    }
                }

            }

        }

        console.log("Die Antwort die gepushed wird lautet : " + randomAnswer);

        question.push(answers);
        /* }*/
        question.push(rightAnswerPosition);




        /*question.push(a);

        questionPool.push(question); // questionPool[0] = Frage 1...
        a++;
        console.log("\n\n" +questionPool[0] + "MEIN SCHEISS POOL MAN\n\n");
        console.log("\n\n" +questionPool[1] + "MEIN SCHEISS POOL MAN\n\n");
        console.log("\n\n" +questionPool[2] + "MEIN SCHEISS POOL MAN\n\n");*/


        resolve(question)

        if (error) {
            reject(error)
        }
    })
}


getData = (url, path, parameter, currentObjects) => {

    //console.log("Starting  get Call on Path [extern API] : " + url + path + parameter + "\n\n")

    //Return new Promise to guarantee right Process timing
    return new Promise((resolve, reject) => {





        if (currentObjects !== undefined) {
            finalObject = finalObject.concat(currentObjects);
        } else {
            console.log("Finish get Call on Path [extern API] : " + url + path + parameter + "\n\n")
        }
        if (parameter === undefined) {
            parameter = ''
        }
        if (path === undefined) {
            path = ''
        }
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


module.exports = functions