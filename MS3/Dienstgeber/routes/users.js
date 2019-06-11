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
    let mytesti = req.body;

    console.log(mytesti);

/*    console.log(mytesti['users'][0] + " KOMM SCHON");
    console.log(mytesti['users'] + " KOMM SCHON");


    console.log(mytesti[0]);*/


    console.log(mytesti.users[0].id);
    console.log(mytesti.users[1].score);
    console.log(mytesti.users[2].id);
    console.log(mytesti.users[3].score);
    let dst = JSON.stringify(req.body,null,2);
    console.log("DST - " + dst);
    console.log("DST lengt- " + dst.length);
    console.log("DST 0- " + dst[0]);
    console.log("DST users- " + dst["users"]);


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
    res.status(200).send("POST WURDE AUFEGRUDEN")
});

router.put('/', function(req, res){

    // TODO : Change UserScore in Database

    res.send('respond with a resource');
});

router.delete('/', function(req, res){
    // TODO: Maybe set Userscore to 0 ?
});


module.exports = router;
