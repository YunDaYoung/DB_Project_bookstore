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
          var data = {
            bookID : result[0].bookID,	
            bookName : result[0].bookName,	
            bookPrice : result[0].bookPrice,	
            bookStock : result[0].bookStock,	
            bookAuthor : result[0].bookAuthor,	
            bookImage : result[0].bookImage
          }
          res.send(200, data);
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

module.exports = router;