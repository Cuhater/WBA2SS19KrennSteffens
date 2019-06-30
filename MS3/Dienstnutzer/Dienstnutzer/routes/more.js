var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {

    let allPlayerQuestionsArray = await getCustomQuestions();
    let playerQuestions = await getPlayerQuestions(allPlayerQuestionsArray);
    //console.log(JSON.stringify(playerQuestions,null,2))
    let tryToGetUsers = await getUsers();
/*    for (let i = 0; i < tryToGetUsers['users'].length; i++) {
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i]);
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i].id);
        console.log("\n i" + i + " "+ tryToGetUsers['users'][i].score);
    }*/
    res.render('more', { title: 'More', users : tryToGetUsers, playerQuestions: playerQuestions});
});

router.post('/addquestion', async function(req, res) {

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


    res.render('questionAdded', { title: 'More', qText: req.query.qText, a1: req.query.a0, a2: req.query.a1, a3: req.query.a2, a4: req.query.a3, ra: req.query.ra});
    //res.redirect(req.baseUrl + '/questionadded')
});

router.get('/changequestion', async function(req, res) {
    console.log("qtext " + req.query.qText);
    console.log("a1 " + req.query.a1);
    console.log("a2 " + req.query.a2);
    console.log("a3 " + req.query.a3);
    console.log("a4 " + req.query.a4);
    console.log("ra " + req.query.ra);
    console.log("qID " + req.query.qID);


    let currentUser = getSessionUserID();
    console.log("userID " + currentUser);
    let editObject = {};
    let answers = {};
    answers.a1 = req.query.a1;
    answers.a2 = req.query.a2;
    answers.a3 = req.query.a3;
    answers.a4 = req.query.a4;


    editObject.qID = req.query.qID;
    editObject.userID = currentUser;
    editObject.text = req.query.qText;
    editObject.answers = answers;
    editObject.right = parseInt(req.query.ra);

    // TODO : HAU MAL N PUT RAUS UND SHEPPER HIER HEFTIG YOAA :)

    console.log("HALLO FINAL HERE : " + JSON.stringify(editObject, null,2))

    await putCustomQuestion(editObject);



    res.render('changeQuestion', { title: 'question successfully changed', qText: req.query.qText, a1: req.query.a1, a2: req.query.a2, a3: req.query.a3, a4: req.query.a4,ra: req.query.ra});
});

router.get('/deletequestion', async function(req, res) {

    await deleteCustomQuestion(req.query.qID);
    res.render('deletedQuestion', { title: 'quiz-Wars', qID: req.query.qID });
});

module.exports = router;
