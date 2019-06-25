var express = require('express');
var router = express.Router();


router.get('/', async (req, res, ) => {
    let theTopics = getAllTopics();

    console.log(JSON.stringify(theTopics, null, 2));
    res.status(200).send(theTopics)
    // TODO Show Links by JSON
});

module.exports = router;