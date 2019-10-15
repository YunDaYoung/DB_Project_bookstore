var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//카드 정보 조회
router.get('/:customerID', function(req, res, next) {
  var customerID = req.params.customerID;var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbcard WHERE customerID = ?"
      conn.query(sql, [customerID], (err, result) => {
        if(err) { console.log(err); }
        else {
          if(result.length === 0){
            res.send(500, {result:false});
          }
          else{
            var data = {
              cardNumber: result[0].cardNumber,
              cardExpiry: result[0].cardExpiry, 
              cardType: result[0].cardType
            }
            res.send(200, data);
          }
        }
      })
    }
  })
});

//카드 정보 등록
router.post('/:customerID', function(req, res, next) {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "INSERT INTO tbcard (cardNumber, customerID, cardExpiry, cardType) VALUES (?, ?, ?, ?)"
      conn.query(sql, [req.body.cardNumber, customerID, req.body.cardExpiry, req.body.cardType], (err, result) => {
        if(err) { console.log(err); }
        else {
          res.send({result : true});
        }
      });
    }
  });
});

//카드 정보 삭제
router.delete('/:cardNumber', function(req, res, next) {
  var cardNumber = req.params.cardNumber;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "DELETE FROM tbcard WHERE cardNumber = ?"
      conn.query(sql, [cardNumber], (err, result) => {
        if(err) { console.log(err); }
        else {
          res.send({result : true});
        }
      });
    }
  });
});

module.exports = router;