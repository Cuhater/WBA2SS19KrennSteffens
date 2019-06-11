var express = require('express');
var router = express.Router();
const functions = require('../public/javascripts/functions')

/* GET home page. */
router.get('/', async function(req, res, next) {
   /* console.log(req.body);
    console.log(req.params)
    console.log(req.query)*/

    let userIDreq = req.query;
    let userID;
    let playerInfo;
    let myKey = Object.values(userIDreq);

    //console.log(userIDreq);
    //console.log(myKey);

    userID = getSessionUserID();
    //console.log("current SESSION USER" + userID);

    //let testii = await getUsers()
    //console.log("TESTIIIIIIIIIIIIIIIIIIIIIIIIIII" + testii)

    if(userID === undefined)
    {
        console.log("SESSION USEr SET USER INCOMING" + userIDreq.userID);
        setSessionUser(userIDreq.userID)
        console.log("test vor der rissmethode");
        let myTest = await setUserID(userIDreq.userID);
        console.log(myTest);
        console.log("MYYYYYYYYYYYYYYYTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST"+JSON.stringify(myTest, null, 2));

        let status = await postUsers(myTest);
        console.log("hat geklappt?" + status)
        let testscore = await getPlayerScore(userIDreq.userID);
        console.log(testscore + " testi scori")
    }
    else
    {
        console.log("User is defined : " + userID);

    }



    //console.log(userID)

    //playerInfo = getPlayerScore(userID);
    //console.log(playerInfo)




    res.render('dashboard', { title: 'Dashboard'});
});

module.exports = router;
