const express = require('express');
const functions = express();
const https = require('https');
const fs = require('fs');

let apiData = [];
let ultraArray = [];
let categorySpacer = {};
let baseURL = 'https://swapi.co/api';

let topics = [];
topics.push('species');
topics.push('planets');
topics.push('people');
topics.push('vehicles');
topics.push('starships');
topics.push('films');
topics.push('custom');

init = async () => {

/*

    for (let i = 0; i < topics.length -1; i++) {
        let currentTopic = await getData(baseURL, "/"+ topics[i]+"/", '?page=1');
        ultraArray.push(currentTopic);
        // apiData leeren
        apiData = [];
    }
*/

    /*
        // Get all Data from API (Species, Planets, People, Starships, Films)
    let species_all = await getData(baseURL, '/species/', '?page=1');
    ultraArray.push(species_all); // 0
    apiData = [];

    let planets_all = await getData(baseURL, '/planets/', '?page=1');
    ultraArray.push(planets_all); // 1
    apiData = [];

    let people_all = await getData(baseURL, '/people/', '?page=1');
    ultraArray.push(people_all);
    apiData = [];

    let vehicles_all = await getData(baseURL, '/vehicles/', '?page=1');
    ultraArray.push(vehicles_all);
    apiData = [];

    let starships_all = await getData(baseURL, '/starships/', '?page=1');
    ultraArray.push(starships_all);
    apiData = [];

    let films_all = await getData(baseURL, '/films/', '?page=1');
    ultraArray.push(films_all);
    apiData = [];
    */

    console.log("\n\n### Finish init Routine ###");
    console.log("\n\n##### System is waiting for incoming Requests #####");

    // Cleanup local Data | spelling (grey, gray) or undefined attributes
    await cleanUpData();

    // Question Pool aufbauen.
    let myQuestionText;
    let arrayindex;

        for (let j = 0; j < topics.length - 1 ; j++) {

            // Get specific Topic (species, people, starships...)
            let specificTopic = getSpecificTopic(j);
            categorySpacer[j] = [];

            // Create 2 Question from specified Topic
            for (let i = 0; i < 2 ; i++) {
                myQuestionText = getQuestionTemplate(specificTopic);
                arrayindex = j;
                let myQuestion = await getValue(ultraArray[arrayindex], myQuestionText.cat, myQuestionText.text);
                categorySpacer[j].push(myQuestion)
            }
        }
        // Write questions to questionPool.json
    fs.writeFile('questionPool.json', JSON.stringify(categorySpacer, null,2), (err) => {
                if (err) throw err;
        // success case, the file was saved
        console.log('QuestionPool was created');
    });
};

getAllTopics = () => {
    return topics;
};

// UltraArray an Questions übergeben
getAllData = () => {
    return ultraArray;
};

overwriteData = (newData, arrayIndex) => {

    ultraArray[arrayIndex] = newData;

    return ultraArray;
};

getSpecificTopic = (topicIndex) => {
    let topic = topics[topicIndex];
    return topic
};
getRandomTopic = () => {
    let questionText;
    let topicIndex;
    let myTransferObject = [];

    let rnd = getRandom(topics.length);
    let rndTopic = topics[rnd];

    questionText = getQuestionTemplate(rndTopic);
    topicIndex = rnd;
    myTransferObject.push(questionText);
    myTransferObject.push(topicIndex);

    return myTransferObject;
};

cleanUpData = () => {
    return new Promise((resolve, reject) => {
    let cleanArray = [];
    for (let i = 0; i < ultraArray.length; i++) {
        // 0,12345
        let category = ultraArray[i];

        // ultraarray[0] ---> array[[o1],[o2],[o3]... ---> array[1] ---->  2 Datensatz!
        // [ <SPECIES| [ {aa} ] [ bb ] [ cc } |SPECIES>  <PEOPLE| [ {dd} ] [ ee ] [ ff } |PEOPLE> ]

        let categoryArray = [];
        for (let j = 0; j < category.length; j++) {

            let data = category[j];
            let keys = Array;
            keys = Object.keys(data);
            let value = Array;
            value = Object.values(data);

            let innerObject = {};
            for (let k = 0; k < value.length; k++) {


                let singleKey = keys[k];

                if (value[k] === null)
                {
                    console.log("NULL DATA WARNING");
                }
                if (value[k] === undefined || value[k] === null) {
                    value[k] = 'undefined';
                }

                if(value[k].toString().includes("gray"))
                {
                    value[k] = value[k].toString().replace('gray', 'grey');
                }
                innerObject[singleKey] = value[k]
            }
            categoryArray.push(innerObject);
        }
        cleanArray.push(categoryArray)

    }
     ultraArray = cleanArray
     resolve(ultraArray);
    });
};


getDBData = () => {
    let counter = 0;
    return new Promise((resolve, reject) => {
        fs.readFile('database.json', (err, data) => {

            if (err) throw err;
            let isThereData = JSON.parse(data);
            counter = isThereData.length;
            resolve(isThereData)
        })
    })
};
saveDBData = (dataToSave) => {
    //let counter = 0;
    return new Promise((resolve, reject) => {
        fs.writeFile('database.json', JSON.stringify(dataToSave, null, 2), (err, data) => {

            if (err) throw err;
            //let isThereData = JSON.parse(data);
            //counter = isThereData.length;
            resolve("Void?")
        })
    })
};



// QuestionPool für Quiz bereitstellen
getQuestionPoolData = () => {
    return new Promise((resolve, reject) => {
    fs.readFile('questionPool.json', (err, data) => {
        if (err) throw err;
        let dbPool = JSON.parse(data);
        console.log('This is after the read call');
        resolve(dbPool)
    });
    })
};

// Question Template bereitstellen
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
    //vehicleText.push({text: "Which Vehicleclass got", cat: "vehicle_class"});
    vehicleText.push({text: "Which Lenght in (m) got", cat: "length"});
    //vehicleText.push({text: "How big have to be the Crew of", cat: "crew"});

    // Sample QuestionText ## Starships ##
    starshipText.push({text: "Which Starshipclass got", cat: "starship_class"});
    starshipText.push({text: "How many Passengers can carry", cat: "passengers"});
    starshipText.push({text: "How Expensive (in Credits) is ", cat: "cost_in_credits"});

    // Sample QuestionText ## Films ##
    //filmsText.push({text: "Which episode got", cat: "episode_id"});
    filmsText.push({text: "Who is the Director of", cat: "director"});
    //filmsText.push({text: "When came out", cat: "realease_date"});

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
};

getRandom = (range) => {
    return Math.floor(Math.random() * range)
};

getValue = (dataSource, category, questionText) => {
    return new Promise((resolve, reject) => {

        // Prepare Array to gather all possible Answers
        let allAnswersOfTopic = [];

        // Get INT 0-3 for the Position of the right Answer
        let rightAnswerPosition = getRandom(4);
        //console.log(" DIE STELLE DER RICHTIGEN ANTWORT " + rightAnswerPosition);

        // Get rnd INT in length of used Data Source
        let rnd = Math.floor(Math.random() * dataSource.length);

        //Get all Values
        // Für alle Einträge der Liste "dataSource" in "allAnswersOfTopic" speichern
        for (let i = 0; i < dataSource.length; i++) {

            let obj = dataSource[i];
            allAnswersOfTopic[i] = obj[category]
        }

        // Create QuestionObject
        let question = [];
        // Pushing Question Text to first index of Array

        let isUnknown = false;

        // Test dataSource of "unknown" Data and re-random it ? :D
        if (dataSource[rnd].name === "unknown") {

            isUnknown = true;
            while (isUnknown) {
                rnd = Math.floor(Math.random() * dataSource.length);
                isUnknown = false;
            }
        }

        // Check if Data is from Film
        if (category === 'director' || category === 'episode_id' || category === 'release_date')
        {
            question.push(questionText + " " + dataSource[rnd].title + " ?");
        } else {
            question.push(questionText + " " + dataSource[rnd].name + " ?");

        }


        // Prepare answer Block
        let answers = [];
        let alarm = false;
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

                            let i = 0;

                            while (randomAnswer === answers[0] && !alarm || randomAnswer === answers[1] && !alarm || randomAnswer === answers[2] && !alarm || randomAnswer === allAnswersOfTopic[rnd] || bool === false) {
                                randomAnswer = allAnswersOfTopic[getRandom(dataSource.length)];
                                //console.log("Neu generierte Antwort: " + randomAnswer);
                                bool = true;
                                if(randomAnswer === null)
                                {
                                    bool = false;
                                }
                            }
                            if (bool) {

                                // Versuch while schleife zu beenden bei Datenquelle mit zu wenig möglichen Antworten
                             /*  if(alarm)
                                {
                                        answers.push("Error please check your Datasource")
                                        rndAnswerPushed = true;
                                        bool = false;
                                        alarm = false
                                        i = 0;
                                }
                                else{*/
                                    answers.push(randomAnswer);
                                    rndAnswerPushed = true;
                                    bool = false;
                               /* }
*/
                            }
                        }
                    }
                }

            }
        }
        // in Answers gepushte Array
        //console.log("Die Antwort die gepushed wird lautet : " + randomAnswer);
        question.push(answers);
        /* }*/
        question.push(rightAnswerPosition);

        resolve(question);

        if (error) {
            reject(error)
        }
    })
};


getData = (url, path, parameter, currentObjects) => {

    //console.log("Starting  get Call on Path [extern API] : " + url + path + parameter + "\n\n")

    //Return new Promise to guarantee right Process timing
    return new Promise((resolve, reject) => {

        if (currentObjects !== undefined) {
            apiData = apiData.concat(currentObjects);
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
                    console.log("Finish get Call next Path [extern API] : " + jsonObject.next + "\n\n");
                    resolve(await getData(jsonObject.next, '', '', jsonObject.results))
                } else {
                    //Concat Final Object with last results
                    apiData = apiData.concat(jsonObject.results);
                    resolve(apiData)
                }
            });
            // On Error reject Promise
            res.on('error', function (error) {
                reject(error);
            })
        });
    })
};



// MS3 specific Edit

getUserData = () => {


    // TODO Read User DB return Array
        let counter = 0;
        return new Promise((resolve, reject) => {
            fs.readFile('userDB.json', (err, data) => {

                if (err) throw err;
                let isThereData = JSON.parse(data);
                counter = isThereData.length;
                resolve(isThereData)
            })
        })


}
setUserData = (dataToSave) => {

    fs.writeFile('userDB.json', JSON.stringify(dataToSave, null,2), (err) => {
        if (err) throw err;
        // success case, the file was saved
        console.log('User was created');
    });
    // TODO: add user?
}
updateUserData = () => {

    // TODO: Update User?
}
deleteUserData = () => {

    // TODO : delete user from db?
}



module.exports = functions;