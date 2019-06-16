var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {



    // TODO : ÜBERGEBEN VON OBJEKT MIT PLAYERSCORES
    // TODO : ÜBERGEBEN ?? VON FRAGEN, die vom nutz erstellt wurden
    //TODO : übergen von userID ? bzw currentUser abcheckern
    // todo heftig css scheppern :>


    if(req.query.param === 'hallo')
    {
        console.log("\n\n\n\n\n\n AAAAAAAAAAAAAAAAAA \n\n\n\n")
    }
    if(req.query.param === undefined)
    {
        console.log("\n\n\n\n\n\n BBBBBBBBBBBBBBBBBBBBBBB \n\n\n\n")
    }


    let tryToGetUsers = await getUsers();
    console.log("\n\n TRY TO GET USERS \n" + tryToGetUsers);

    for (let i = 0; i < tryToGetUsers['users'].length; i++) {
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i]);
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i].id);
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i].score);
    }



    res.render('more', { title: 'More', users : tryToGetUsers});
});

router.get('/questionadded', async function(req, res) {
    console.log("QUESTIONADD")
    res.render('more', { title: 'More', users : '', testiiiii: 'hallo'});
});

router.get('/addquestion', async function(req, res) {


    console.log("AAAAAAAAAAAAAADQUEEEEEEEEEEESTIOOOOOOOOOOOOOOON")
    let tryToGetUsers = await getUsers();

    let currentUser = getSessionUserID();
    console.log(currentUser + " CURRENT USER :>")
    console.log("SCORE " + req.query.qText);
    console.log("SCORE " + req.query.a0);
    console.log("SCORE " + req.query.a1);
    console.log("SCORE " + req.query.a2);
    console.log("SCORE " + req.query.a3);
    console.log("SCORE " + req.query.ra);

    let newQuestionObject = {};
    newQuestionObject.userID = parseInt(currentUser);
    newQuestionObject.text = req.query.qText;

    let newAnswerObject = {}
    newAnswerObject.a1 = req.query.a0;
    newAnswerObject.a2 = req.query.a1;
    newAnswerObject.a3 = req.query.a2;
    newAnswerObject.a4 = req.query.a3;

    newQuestionObject.answers = newAnswerObject;
    newQuestionObject.right = parseInt(req.query.ra);

    console.log("NQO" + newQuestionObject);
    console.log("NQO STRINGI" +JSON.stringify(newQuestionObject,null,2));

    // TODO : METHOD CALL PUT
    await postCustomQuestion(newQuestionObject)


    res.render('questionAdded', { title: 'More', users : tryToGetUsers, qText: req.query.qText, a1: req.query.a0, a2: req.query.a1, a3: req.query.a2, a4: req.query.a3, ra: req.query.ra});
    //res.redirect(req.baseUrl + '/questionadded')
});

module.exports = router;
