var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Merci de ne pas faire crash le site les DO/IG")
});

module.exports = router;
