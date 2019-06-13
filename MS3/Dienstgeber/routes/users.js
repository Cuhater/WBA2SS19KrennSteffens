var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {

    // TODO Return the Userscore from Database

    let userData = await getUserData();
    res.status(200).send(userData)

});

router.post('/', function(req, res){

    // TODO: Check if userID exist | If not -> Create "POST" user in userDB

    //let pst = JSON.parse(req.body);
    //console.log("pst? " + pst);


    // TODO : ISSUE ! NEDSTED ARRAY :(++
    //console.log(req.body);
    let requestedObject = req.body;

    console.log(requestedObject);

/*    console.log(mytesti['users'][0] + " KOMM SCHON");
    console.log(mytesti['users'] + " KOMM SCHON");


    console.log(mytesti[0]);*/
/*

    console.log(mytesti.users[0].id);
    console.log(mytesti.users[1].score);
    console.log(mytesti.users[2].id);
    console.log(mytesti.users[3].score);*/
    /*//let dst = JSON.stringify(req.body,null,2);
    console.log("DST - " + dst);
    //console.log("DST lengt- " + dst.length);
    console.log("DST 0- " + dst[0]);
    console.log("DST users- " + dst["users"]);*/


  /*  for (let i = 0; i < dst.length; i++) {
        console.log(dst[i] + "AN DER STELLE IIIIIIII " + i)
    }
*/

    /* a =(req, res)  =>{
        if (req.method === 'POST') {
            var jsonString = '';

            console.log("HILFE?=");
            req.on('data', function (data) {
                jsonString += data;
            });

            req.on('end', function () {
                console.log(JSON.parse(jsonString));
            });
        }
    }
    a();*/
/*
        if(req.body === undefined)
        {
            console.log(" ####################### UNDEEEEEEEEEEEFIIIIIIIIIIIINNNNNNNNEEEEEEEEEEDDDD")
        }
        var jsonString = '';
    console.log("111111111111111");
    req.on('data', function (data) {
        console.log("IS THERE DATA??");
        jsonString += data;
        });
        req.on('end', function () {
            console.log("WAS IST GESCHEHEN?" + JSON.parse(jsonString));
        });
    console.log("wwwwwwwwwwwwwwwwwww");
    let myTestiii = req.body;
    console.log(myTestiii.length)

    let keys = Object.keys(req.body)
    console.log(keys);
    console.log("WASCHDALOS?" + JSON.stringify(myTestiii,null,2));


    let funktioniere = JSON.stringify(myTestiii,null,2)

    console.log(funktioniere['users'] + " UZERZ");

    console.log("WASCHDALOS?" + req.body);

    console.log("WASCHDALOS?" + myTestiii["users"]);

    let userArray = {"users" : []};
    let userObject = { "id":"1", "score":100};
    userArray["users"].push(userObject)
    let userObject2 = { "id":"2", "score":200};
    userArray["users"].push(userObject2)
*/

    //console.log(userArray + " AAAAAAAAAAAAAAAAAAAAAAAAA")

    /*let obj = JSON.parse(userObject);

    userArray.push(userObject);*/
    //let newData = setUserData(myTestiii);
    //console.log("WASCHDALOS?" + req.body.users);
    setUserData(requestedObject)


    res.status(200).send("POST WURDE AUFEGRUDEN")
});

router.put('/', async function(req, res){

    // TODO : Change UserScore in Database

    let requestedObject = req.body;

    console.log(req.body.length);
    console.log(req.body.score);
    console.log(req.body.id);
    console.log(JSON.stringify(req.body,null,2));


    console.log(requestedObject + " RO");


    // TODO : LOAD USER DATA
    // PUT VALUE IN ID

    let userDBData = await getUserData();
    let testi
    console.log("userDB " + userDBData['users']);

    let userData = userDBData['users'];

    for (let i = 0; i < userDBData['users'].length ; i++) {
        if(userDBData['users'][i].id === req.body.id)
        {
            testi = userDBData['users'][i].score + parseInt(req.body.score);
            console.log(testi + "TESTI :>")
            userDBData['users'][i].score = testi;

        }
        console.log("score wurde auf " + userDBData['users'][i].score + " gesetzt");
    }

    //console.log("CURR USER DADA" + userDBData)
    setUserData(userDBData)





    // TODO : SAVE USER DATA
    // respond with ka? :D



    res.sendStatus(200).send(testi);
});

router.delete('/', function(req, res){
    // TODO: Maybe set Userscore to 0 ?
});


module.exports = router;
