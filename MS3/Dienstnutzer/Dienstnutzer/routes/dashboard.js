var express = require('express');
var router = express.Router();
const functions = require('../public/javascripts/functions')

/* GET home page. */
router.get('/', async function(req, res, next) {
   /* console.log(req.body);
    console.log(req.params)
    console.log(req.query)*/
    let userID;
    userID = getSessionUserID();


    if (req.query !== {})
    {
        if (req.query.score !== undefined)
    {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log("SCORE " + req.query.score);



        await updatePlayerScore(req.query.score);
        let currentScore = await getPlayerScore(userID)

        console.log("PLAYERSCORE" + currentScore + "\n\n\n")

        updateSessionPlayerScore(currentScore);


        console.log("\n\n" + currentScore + "\n\n wasgeht");
        //res.render('dashboard', { title: 'Dashboard'});
    }
    else if (req.query.userID !== undefined)
    {
        let userIDreq = req.query;

        let playerInfo;
        let myKey = Object.values(userIDreq);

        //console.log(userIDreq);
        //console.log(myKey);


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
    }
        else if (req.query.type !== undefined)
        {
            console.log("JOA IS MIT tYPE NE")
        }


        //console.log(userID)

        //playerInfo = getPlayerScore(userID);
        //console.log(playerInfo)




        res.render('dashboard', { title: 'Dashboard'});
    }


});

module.exports = router;
