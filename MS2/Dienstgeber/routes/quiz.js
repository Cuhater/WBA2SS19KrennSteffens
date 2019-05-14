var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/',  (req, res, next) => {

    console.log("Hallo hier kommen die Quizze hin :>");
    res.status(200).send("qwwert");
});


module.exports = router;


