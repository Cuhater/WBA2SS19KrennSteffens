var express = require('express');
var router = express.Router();
const functions = require('../public/javascripts/functions')

/* GET home page. */
router.get('/', async function (req, res, next) {
    /* console.log(req.body);
     console.log(req.params)
     console.log(req.query)*/
    let userID;
    userID = getSessionUserID();


    // CHECK IF QUERY EMPTY IF NOT CHECK IF SCORE EMTPY AND CHANGE IT
    if (req.query !== {}) {
        if (req.query.score !== undefined) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            console.log("SCORE " + req.query.score);


            await updatePlayerScore(req.query.score);
            let currentScore = await getPlayerScore(userID)

            console.log("PLAYERSCORE" + currentScore + "\n\n\n")

            updateSessionPlayerScore(currentScore);


            console.log("\n\n" + currentScore + "\n\n wasgeht");
            //res.render('dashboard', { title: 'Dashboard'});
        } else if (req.query.userID !== undefined) {
            let userIDreq = req.query;
            if (userID === undefined) {
                console.log("SESSION USEr SET USER INCOMING" + userIDreq.userID);
                let callback = await loginUser(userIDreq.userID)

                if (callback === 0) {
                    res.render('userNotFound', {title: "user id not found"});
                }

                /*
                console.log("test vor der rissmethode");
                let myTest = await setUserID(userIDreq.userID);
                console.log(myTest);
                console.log("MYYYYYYYYYYYYYYYTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST" + JSON.stringify(myTest, null, 2));

                let status = await postUsers(myTest);
                console.log("hat geklappt?" + status)
                let testscore = await getPlayerScore(userIDreq.userID);
                console.log(testscore + " testi scori")

                 */
            } else {
                console.log("User is defined : " + userID);

            }
        }

        res.render('dashboard', {title: 'Dashboard'});
    }


});
router.post('/', async function (req, res) {


    let allUsers = await getUsers();
    let allUsersArray = allUsers['users'];

    let possibleID = allUsersArray.length;


    for (let i = 0; i < allUsersArray.length; i++) {

        console.log("HALLO +" + i)
        if (parseInt(allUsersArray[i].id) === possibleID) {
            console.log(" SHIED IS SCHON VORHANDEN +" + possibleID + " MEH " + allUsersArray[i])
            possibleID += 1;
            i = 0;
        } else {
            //if(parseInt(allUsersArray[i].id)   ===
            console.log("test " + allUsersArray[i].id + "userID      " + possibleID)
        }

    }
    console.log(" POSSIBLE ID WÄRE : " + possibleID);

    let updatedUsers = await createNewUser(possibleID);
    await postUsers(updatedUsers);


    // TODO : SAVE new User in DB


    console.log("\n ALARM \n")
    res.render('userCreated', {title: 'user Created', newID: possibleID});
})

module.exports = router;
