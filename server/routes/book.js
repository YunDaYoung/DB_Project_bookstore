var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

// 도서정보 조회
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;