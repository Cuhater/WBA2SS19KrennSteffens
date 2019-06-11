const express = require('express');
const functions = express();
const http = require('http');
http.post = require('http-post');
const request = require('request');

let currentUser;
let currentScore = 0;


getSingleQuestion = () => {
    console.log("HILFE");
    alert("HALLOOOO")
}


testi = () => {
    console.log("SOS")
}

setSessionUser = (userID) => {
    currentUser = userID
}


setUserID = async (userID) => {

    let existingUsers = await getUsers();
    console.log("---------------------------------------------------------------------------")

    console.log("EXISTING" + JSON.stringify(existingUsers, null, 2))
    console.log("EXISTING" + existingUsers["users"].length)

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

    console.log("HALLO TEST???");
    return new Promise((resolve, reject) => {


        http.get('http://localhost:3000/users', (resp) => {
            let data;
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data = chunk;
                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" + data);
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data));
                console.log("wwwwwwwwwwww");
                let jsonData = JSON.parse(data);
                //let innerKey = Object.keys(data)

                console.log("WAS GEHT HIER AB??" + jsonData);
                resolve(jsonData);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err)
        });
    })

}


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

        request.post('http://localhost:3000/users', {
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

setPlayerScore = (count, difficulty) => {


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


}

updatePlayerScore = (userID, userScore) => {
    currentUser = userID;
    currentScore = userScore;

    console.log("Score for player " + currentUser + " has been updated for " + currentScore)

    let updated = true;
    return updated
}

getPlayerScoree = () => {
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


function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}