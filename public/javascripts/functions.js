const express = require('express');
const functions = express();
const https = require('https');
const request = require('request');

let currentUser;
let currentScore = 0;
let locaQuizArray;

testii = (score) => {
    currentScore = score;
}



setSessionUser = (userID) => {
    currentUser = userID
}


createNewUser = async (userID) => {
    let existingUsers = await getUsers();
    let existingUsersArray = existingUsers["users"];
    return new Promise((resolve, reject) => {
        currentUser = userID;

        let userData = {};
        userData.id = currentUser;
        userData.score = 0;

        existingUsers['users'].push(userData)
        resolve(existingUsers);
    });
};
loginUser = async (userID) => {
    let existingUsers = await getUsers();
    let existingUsersArray = existingUsers["users"];
    let newUser = true;
    let existingUser;
    let exisitingScore;
    for (let i = 0; i < existingUsersArray.length; i++) {

        if (parseInt(userID) === existingUsersArray[i].id) {
            userID = existingUsersArray[i];
            existingUser = existingUsersArray[i].id;
            exisitingScore = existingUsersArray[i].score;
            currentScore = exisitingScore;
            currentUser = existingUser;
            newUser = false;
        }
    }
    if(newUser)
    {
        console.error("ERROR");
        return 0
    }
}


setUserID = async (userID) => {

    let existingUsers = await getUsers();
    console.log("---------------------------------------------------------------------------")

    console.log("EXISTING" + JSON.stringify(existingUsers, null, 2))
    console.log("EXISTING" + existingUsers)

    return new Promise((resolve, reject) => {
        currentUser = userID
        console.log("CIRRRRRRRRRRRND USER SET TO" + currentUser)
        let newUser = true;

        let existingUser;
        let exisitingScore;
        console.log("TESTING PORPOUSE");
        let xUsers = existingUsers["users"];

        console.log("X USERS" + xUsers);

        console.log("TESTING PORPOUSE");
        console.log("TESTING PORPOUSE");
        console.log("TESTING PORPOUSE");


        // TODO :  GEGEN eine DO while ersetzen yoooo
        if (newUser) {

            for (let i = 0; i < xUsers.length; i++) {
                if (currentUser === xUsers[i].id) {
                    userID = xUsers[i]
                    existingUser = xUsers[i].id;
                    exisitingScore = xUsers[i].score;
                    newUser = false;

                } else if (newUser){
                    console.log("USER already exist " + newUser)
                    newUser = true;

                }
            }
        }

        if (newUser) {
            // TODO : JSON OBJECT AN bestehenede array packen und der postUser Methode übergeben :>

            let userData = {}
            userData.id = currentUser;
            userData.score = 0;

            existingUsers['users'].push(userData)
            console.log("hallo neuer user")

/*            let jsonObject = {};
            jsonObject.id = currentUser;
            jsonObject.score = 0;*/

            console.log(userData);
            resolve(existingUsers);
            //postUser()
        } else {
            console.log("existing user ID " + existingUser)
            console.log("existing user SCORE " + exisitingScore)

            currentScore = exisitingScore;
            resolve(existingUsers);
        }

        console.log(" ALARMMMMMM: KAKA - " + existingUsers)
        // TODO : Get Users check if userID match -- if not go await post paort


    })

}

getSessionUserID = () => {
    return currentUser;
}

getUsers = () => {

    console.log("Start GET users");
    return new Promise((resolve, reject) => {


        https.get('https://quiz-wars.herokuapp.com/users', (resp) => {
            let data;
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data = chunk;
            });

            // The whole response has been received. Resolve the result.
            resp.on('end', () => {
                let jsonData = JSON.parse(data);
                resolve(jsonData);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err)
        });
    })

};


// TODO : HTTP POST MODULE INSTALLED TO GO 4 EASY POST REQ

postUsers = (dataToSave) => {

    let testObject = JSON.stringify(dataToSave, null, 2);

    let anotherTest = dataToSave;




    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/users',
        headers: {
            'Content-Type': 'application/json'
           // 'Content-Length': Buffer.byteLength(testObject)
        }
    };

    //console.log(anotherTest.length);

    //console.log("\n test o \n " + anotherTest);
    //console.log("\n test o \n " + Object.values(anotherTest));
    //console.log("\n test o \n " + JSON.stringify(Object.keys(anotherTest)));
    //console.log(anotherTest + " another test");
    //console.log(anotherTest[0] + " another test");
    //console.log(anotherTest["users"] + " another test");
    //console.log(JSON.stringify(anotherTest["users"]) + " AAAAAAAAAAAAAAAA test");

    //let finaltestiii = JSON.stringify(anotherTest["users"]);



    let testi = {testi: "testi", testi2: "auch n kleiner süßer testi :>"}
    let tsti2 = {
        "cars":[ {"name":"Ford", "rip": "a"}, {"name" : "BMW", "rio" : "b"}]
    }


    let myObj = {
        "name":"John",
        "age":30,
        "cars": [
            { "name":"Ford", "models":"Fiesta"},
            { "name":"BMW", "models":[ "320", "X3", "X5" ] },
            { "name":"Fiat", "models":[ "500", "Panda" ] }
        ]
    }

    // TODO : HTTP POST CODE
/*

    console.log("testobjekt was übergeben wird im post" + myObj)
    return new Promise((resolve, reject) => {


        http.post(options, myObj, (resp) => {


            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
               console.log(chunk)
            });
            resp.on('end', () => {
                resolve(testObject)
            })
        })
    })
*/

    // TODO : REQUEST POST CODE

    return new Promise((resolve, reject) => {

        request.post('https://quiz-wars.herokuapp.com/users', {
            json: dataToSave
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                reject(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            resolve(body)
        })

    })






}

/*setPlayerScore = (count, difficulty) => {


    console.log("get Playerscore INIT");
    let score = count * difficulty;
    alert("Auch hilfe" + score);
    let userID = getUserID();
    alert("Immer noch hilfe" + userID);
    alert("current noch hilfe" + currentUser);
    //currentScore = getPlayerScore(userID);
    let newScore = currentScore + score;

    console.log("GO 4 update playerscore" + userID + " und " + newScore);
    let callback = updatePlayerScore(5, newScore);

    // 5 Sek Timer Here
    alert("GO 4 update playerscore" + 5 + " und" + newScore);
    if (callback === true) {
        alert(currentScore);
        window.location.href = "/dashboard";
    }


}*/

updatePlayerScore = (userScore) => {
    currentScore = userScore;
    console.log("Score for player " + currentUser + " has been updated for " + currentScore)

    let jsonObject = {};
    jsonObject.id = currentUser;
    jsonObject.score = userScore;

    console.log ("Start PUT on users");

    return new Promise((resolve, reject) => {

    request.put('https://quiz-wars.herokuapp.com/users', {
            json: jsonObject
        }, (error, res) => {
            if (error) {
                console.error(error)
                reject(error)
                return
            }
            resolve(res.statusCode)
            console.log(`statusCode: ${res.statusCode}`)

        })
    })
};

updateSessionPlayerScore = (score) => {

    console.log("\n\n HALLLOOO ETSSSST  \n\n" + score)

    if(score === -10)
    {
        console.log("MINUTZ");
    }
    if(score === 10)
    {
        console.log("PLUS");
    }

    currentScore = score;
}

getSessionPlayerScore = () => {
    return currentScore
}

getPlayerScore = async (userID) => {

    if(currentScore !== 0)
    {
        let userData = await getUsers();

        let users = userData["users"]

        console.log("userData " + userData);
        console.log("userData uu" + userData["users"]);
        console.log("userData length " + userData.length);

        for (let i = 0; i < users.length; i++) {

            if(users[i].id === userID)
            {
                console.log()
                currentScore = users[i].score;
            }
        }
        /*    let dbScore;
            if(currentScore === undefined)
            {
                dbScore = getSpecificPlayerScore(currentUser);
                currentScore = dbScore
            }*/

        return currentScore
    }
    else
    {
        return 0;
    }

}

getSpecificPlayerScore = (userID) => {
    let dbData = getUsers();
    let playerData = false;

    for (let i = 0; i < dbData.length; i++) {
        if (dbData[i].id === userID) {
            playerData = true;
            return dbData[i].score;

        }
    }
    if (!playerData) {
        return 0;
    }

}


getQuizData = (query) => {

    return new Promise((resolve, reject) => {
        https.get('https://quiz-wars.herokuapp.com/quiz' + query, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log("I GOT DATA")
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data));
                let recievedQuestionArray = JSON.parse(data);


                resolve(recievedQuestionArray)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message)
        });
    });
}

setLocalQuizArray = (array) => {
    locaQuizArray = array;
}
getLocalQuizArray = () => {
    return locaQuizArray;
}

postCustomQuestion = (dataToSave) => {
    return new Promise((resolve, reject) => {

        request.post('https://quiz-wars.herokuapp.com/questions', {
            json: dataToSave
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                reject(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            resolve(body)
        })

    })
}
putCustomQuestion = (dataToSave) => {
    return new Promise((resolve, reject) => {

        request.put('https://quiz-wars.herokuapp.com/questions', {
            json: dataToSave
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                reject(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            resolve(body)
        })

    })
}

deleteCustomQuestion = (id) => {
    return new Promise((resolve, reject) => {
        console.log("START DELETE :)");
        request.delete('https://quiz-wars.herokuapp.com/questions/' + id, {
        }, (error, res) => {
            if (error) {
                console.error(error)
                reject(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            resolve(res.statusCode)
        })

    })
}


getServerTopics = () => {
    return new Promise((resolve, reject) => {
        https.get('https://quiz-wars.herokuapp.com/topics', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log("I GOT DATA")
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data));
                let topics = JSON.parse(data);


                resolve(topics)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message)
        });
    });
}

getPlayerQuestions = (questionArray) => {

    let innerKeys = Object.keys(questionArray);




/*    console.log(keys);
    console.log(values);
    console.log(values[0]);
    console.log(values[1]);*/
/*
    let testi = Object.values(values[0]);
    let auchtesti = Object.keys(values[0])
    console.log(" AUHC"  + auchtesti)
    console.log(auchtesti[0]);
    console.log(auchtesti[1]);
    console.log(auchtesti[2]);
    console.log(auchtesti[3]);*/



    // USER ID MATCHES
    console.log("DB DATA " + questionArray)
    console.log("DBA Lenght" + questionArray.length)

    //console.log("x  3 " + x[3])
    console.log("x  req user id " + currentUser)


/*    console.log(myTest + " MY TEST :)");
    let inMyTest = Object.values(myTest[0])*/

    //console.log("inmi :D"+ inMyTest);



    return new Promise ((resolve, reject) => {

        let userQuestionObject = {
            questions: []
        };

        for (let i = 0; i < questionArray.length; i++) {
            let innerObject = Object.values((questionArray[i]));
            console.log("\n \n INNER OBJECT " + innerObject+"\n \n \n \n" )
            let innerKey = Object.keys(questionArray[i])
            let myInnerKey = innerKey[0]
            console.log("INNER KEYS AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA "+ innerKey)
            innerObject[0][4] = myInnerKey;
            console.log("\n \n INNER OBJECTfutollllllll " + innerObject+"\n \n \n \n" )
            let x = innerObject[0];

            if(x[3] === currentUser){
                console.log("FRAGE : " + innerObject + " klappt mit UserID " + currentUser)
                userQuestionObject['questions'].push(innerObject)
            }
        }
        resolve (userQuestionObject)
    });
};

getCustomQuestions = () => {
    return new Promise((resolve, reject) => {
        https.get('https://quiz-wars.herokuapp.com/questions/allCustom', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log("I GOT DATA")
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data));
                let customQuestionArray = JSON.parse(data);


                resolve(customQuestionArray)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message)
        });
    });
}