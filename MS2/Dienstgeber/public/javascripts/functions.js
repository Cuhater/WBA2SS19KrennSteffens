const express = require('express')
const functions = express()
const https = require('https');
let finalObject = [];
let ultraArray = [];


myFunction = async () => {

    //SETUP: BaseURL to get Data from
    let baseURL = 'https://swapi.co/api'
    //INIT: Get all Data from API
    let species_all = await getData(baseURL, '/species/', '?page=1')
    /*
    let planets_all = await getData(baseURL, '/planets/', '?page=1')
    let vehicles_all = await getData(baseURL, '/vehicles/', '?page=1')
    let people_all = await getData(baseURL, '/people/', '?page=1')
    let starships_all = await getData(baseURL, '/starships/', '?page=1')
    let films_all = await getData(baseURL, '/films/', '?page=1')
*/
    ultraArray.push(species_all);
    /*  ultraArray.push(planets_all);
      ultraArray.push(vehicles_all);
      ultraArray.push(people_all);
      ultraArray.push(starships_all);
      ultraArray.push(films_all); */
    console.log("\n\n### Finish init Routine ###")
    console.log("\n\n##### System is waiting for incoming Requests #####")
}

getAllData = () => {
    return ultraArray;
}

getQuestionTemplate = (category) => {

    let speciesQuestions = [];

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
    peopleText.push({text: "Which gender got", cat: "gender"});

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
    starshipText.push({text: "How many Passengers can carry", cat: "language"});
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
        console.log(" DIE STELLE DER RICHTIGEN ANTWORT " + rightAnswerPosition);


        let rnd = Math.floor(Math.random() * dataSource.length)

        //console.log("WAS IS RANDOM ? :D" + rnd);
        //Get all Values

        // Für alle Einträge der Liste "dataSource"
        for (let i = 0; i < dataSource.length; i++) {
            let obj = dataSource[i]
            //console.log(category);
            //console.log("ÖH" +i);
            //console.log("Klappts???" +obj[category])
            allAnswersOfTopic[i] = obj[category]
        }

        // Create QuestionObject
        let question = [];
        // Pushing Question in Object for testing purpose
        question.push(questionText + " " + dataSource[rnd].name + " ?")

        // Prepare answer Block

        //console.log("RA POSI" + rightAnswerPosition);


        // Get three Randomnumbers in the Range of the lenght of the Datasource
        let rnd1 = getRandom(dataSource.length)
        let rnd2 = getRandom(dataSource.length)
        let rnd3 = getRandom(dataSource.length)

        let answers = [];
        /*        for(let x = 0; x <= 3 ; x++)
                {*/
        /*    if(x === rightAnswerPosition) // RA position (1-4)
            {*/

        //console.log("richtige antwort" + allAnswersOfTopic[rnd]);
        //answers.push(allAnswersOfTopic[rnd])
        //console.log("HALLO JAMOIN MEINE FRAGE IS GLEICH RA" + rightAnswerPosition + x);
        /*  }
          else
          {*/

        let bool = false;

        let randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
        console.log(randomAnswer + " FIRRRRST RND ANSW")

        for (let u = 0; u <= 3; u++) {
            let rndAnswerPushed = false;
            console.log("UHHHHHHHHHH" + u);
            //console.log(answers[u] + "answers[u");

            if (u === rightAnswerPosition) {
                if (randomAnswer !== allAnswersOfTopic[rnd]) {
                    console.log("richtige antwort" + allAnswersOfTopic[rnd]);
                    answers.push(allAnswersOfTopic[rnd])
                } else {


                    console.log("AAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAARMMM");
                    let gotIt = false;

                    while(!gotIt && randomAnswer === allAnswersOfTopic[rnd]){
                        randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
                        if(randomAnswer !== allAnswersOfTopic[rnd])
                        {
                            gotIt = true;
                        }

                    }
                    if(gotIt)
                    {
                        answers.push(randomAnswer)
                    }


                }

            } else {


                if (answers.length === 0 && randomAnswer !== allAnswersOfTopic[rnd]) {
                    console.log("########## RICHTIGE ANTWORT IST NICHT GLEICH STELLE U")
                    console.log("KEINE ANTWORT VORHANDEN PUSHE RND ANTWORT " + randomAnswer)
                    answers.push(randomAnswer)
                } else {


                    console.log("-------- ANSWERS IST NICHT LEER --------  " + answers[0])

                    for (let t = 0; t <= u; t++) {
                        if (!rndAnswerPushed) {

                            console.log(u + "   UHHHHHHHH GROSSE");

                            while (randomAnswer === answers[0] ||randomAnswer === answers[1]  || randomAnswer === answers[2] || randomAnswer === allAnswersOfTopic[rnd] || bool === false) {
                                randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
                                console.log("EINE GENERIERTE ANTWROT" + randomAnswer);

                                bool = true;
                            }
                            if (bool) {


                                console.log("BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL US TRUE YAAAA")
                                answers.push(randomAnswer)
                                rndAnswerPushed = true;
                                bool = false;
                                console.log("ELLSE PUSH TEIL YOOO" + randomAnswer);
                            }
                        }

                    }
                }


                /*console.log("Unsere Fertige Random Answer die gepusht wird im WHILE TEIL: " + randomAnswer);
                answers.push(randomAnswer)*/
            }
            /*else
            {
                console.log("Unsere Fertige Random Answer die gepusht wird im ELSE TEIL: " + randomAnswer);
                answers.push(randomAnswer)
            }*/

        }

        //console.log(randomAnswer);
        //console.log("RANDOM answer" + randomAnswer + "q Answer" + question[z]);
        //z++

        //console.log("ZET " + z);
        /*   }
           while(!bool || randomAnswer === allAnswersOfTopic[rnd])
*/


        console.log("Die Antwort die gepushed wird lautet : " + randomAnswer);


        /*if(randomAnswer === question[x] || randomAnswer === allAnswersOfTopic[rnd])
        {
            randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
            console.log("OHWEIA HIIILFE");
            console.log(randomAnswer);
        }
        else
        {
            question.push(randomAnswer)
        }*/

        /* }*/
        question.push(answers);
        /* }*/
        question.push(rightAnswerPosition);
        for (let y = 0; y < 6; y++) {
            console.log("//");
            console.log(question[y]);
        }


        //console.log("RIGHT ANSWER: " + dataSource[rnd].skin_colors )

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