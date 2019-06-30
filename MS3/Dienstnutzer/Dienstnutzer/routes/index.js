var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  let currentUser = getSessionUserID();
  if (currentUser === undefined)
  {
    res.render('index', { title: 'quiz-Wars' });

  }
  else
  {
    res.render('dashboard', { title: 'quiz-Wars' });
  }

});

module.exports = router;
