var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

// 도서정보 조회
router.get('/:bookID', function(req, res, next) {
  var bookID = req.params.bookID;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbbook WHERE bookID = ?"
      conn.query(sql, [bookID], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send(200, result);
        }
      })
    }
  })
});

//모든 도서정보 조회
router.get('/', function(req, res, next) {
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var data = [];
      var sql = "SELECT * FROM tbbook"
      conn.query(sql, (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send(200, result);
        }
      })
    }
  })
});

// 도서정보 등록
router.post('/', function(req, res, next) {
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "INSERT INTO tbbook(bookName, bookPrice, bookStock, bookAuthor, bookImage) VALUES (?, ?, ?, ?, ?)"
      conn.query(sql, [req.body.bookName, req.body.bookPrice, req.body.bookStock, req.body.bookAuthor, req.body.bookImage], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send({result : true});
        }
      })
    }
  })
});

// 도서정보 수정
router.put('/:bookID', function(req, res, next) {
  var bookID = req.params.bookID;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "UPDATE tbbook SET bookName = ?, bookPrice = ?, bookStock = ?, bookAuthor = ?, bookImage = ? WHERE bookID = ?"
      conn.query(sql, [req.body.bookName, req.body.bookPrice, req.body.bookStock, req.body.bookAuthor, req.body.bookImage, bookID], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send({result : true});
        }
      })
    }
  })
});

// 도서정보 삭제
router.delete('/:bookID', function(req, res, next) {
  var bookID = req.params.bookID;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "DELETE FROM tbbook WHERE bookID = ?"
      conn.query(sql, [bookID], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send({result : true});
        }
      })
    }
  })
});

// 도서검색
router.get('/search/:bookName', function(req, res, next) {
  var bookName = req.params.bookName;
  var data = [];
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbbook WHERE bookName = ?"
      conn.query(sql, [bookName], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send(200, result);
        }
      })
    }
  })
});


module.exports = router;