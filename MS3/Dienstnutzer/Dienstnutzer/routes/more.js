var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {



    // TODO : ÜBERGEBEN VON OBJEKT MIT PLAYERSCORES
    // TODO : ÜBERGEBEN ?? VON FRAGEN, die vom nutz erstellt wurden
    //TODO : übergen von userID ? bzw currentUser abcheckern
    // todo heftig css scheppern :>

    let tryToGetUsers = await getUsers();
    console.log("\n\n TRY TO GET USERS \n" + tryToGetUsers);

    for (let i = 0; i < tryToGetUsers['users'].length; i++) {
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i]);
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i].id);
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i].score);
    }

    res.render('more', { title: 'More', users : tryToGetUsers });
});

module.exports = router;
