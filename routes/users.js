var express = require('express');
var router = express.Router();

/* GET users listing , but here is no use of this */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
