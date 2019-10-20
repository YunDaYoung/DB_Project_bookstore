var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//회원가입
router.post('/signUp', function(req, res) {
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbcustomer WHERE customerID = ?"
      conn.query(sql, [req.body.customerID], (err, result) => {
        if(err) { console.log(err); }
        else {
          if(result.length === 0){
            var insert = "INSERT INTO `tbcustomer`(`customerID`, `customerName`, `password`) VALUES (?, ?, ?)"
            conn.query(insert, [req.body.customerID, req.body.customerName, req.body.password], (err, result) => {
              conn.release();
              if(err) { console.log(err); }
              else {
                res.send({ result: true });
              }
            })
          }
          else{
            res.send({ result: false });
          }
        }
      })
    }
  });
});

//로그인
router.post('/signIn', function(req, res, next) {
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbcustomer WHERE customerID = ? AND password = ?"
      conn.query(sql, [req.body.customerID, req.body.password], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          if(result.length === 0){
            res.send(500, {result:false})
          }
          else {
            var data = {
              memberID: result[0].customerID,
              memberName: result[0].customerName
            }
            res.send(200, data);
          }
        }
      });
    }
  });
});

module.exports = router;
