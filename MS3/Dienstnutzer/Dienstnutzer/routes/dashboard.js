var express = require('express');
var router = express.Router();
const functions = require('../public/javascripts/functions')

/* GET home page. */
router.get('/', async function (req, res) {
    let userID;
    userID = getSessionUserID();

    // CHECK IF QUERY EMPTY IF NOT CHECK IF SCORE EMTPY AND CHANGE IT
    if (req.query !== {}) {

        if (req.query.score !== undefined) {
            await updatePlayerScore(req.query.score);
            let currentScore = await getPlayerScore(userID);
            updateSessionPlayerScore(currentScore);

        } else if (req.query.userID !== undefined) {
            let userIDreq = req.query;
            if (userID === undefined) {
                console.log("SESSION USEr SET USER INCOMING" + userIDreq.userID);
                let callback = await loginUser(userIDreq.userID);

                if (callback === 0) {
                    res.render('userNotFound', {title: "user id not found"});
                }
            } else {
                console.log("User is already defined : " + userID);
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
        if (parseInt(allUsersArray[i].id) === possibleID) {
            possibleID += 1;
            i = 0;
        }
    }
    console.log(" POSSIBLE ID WÄRE : " + possibleID);
    let updatedUsers = await createNewUser(possibleID);
    await postUsers(updatedUsers);
    // TODO : SAVE new User in DB

    res.render('userCreated', {title: 'user Created', newID: possibleID});
})

module.exports = router;
