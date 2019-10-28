var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//배송지 등록
router.post('/:customerID', function(req, res, next) {
    var customerID = req.params.customerID;
    pool.getConnection((err, conn) => {
      if(err) { console.log(err); }
      else {
        var sql1 = "INSERT INTO tbaddress(tbCustomer_customerID, addressNumber, address, addressDetail) VALUES (?, ?, ?, ?)"
        conn.query(sql1, [customerID, req.body.addressNumber, req.body.address, req.body.addressDetail], (err, result) => {
          conn.release();
          if(err) { console.log(err); res.send({result : false})}
          else if(result){
            res.send(200, {result : true});
          }
          else{ res.send(400, {result : false}); }
        });
      }
    });
});
  
//배송지 수정
router.put('/:customerID/:addressID', function(req, res, next) {
    var customerID = req.params.customerID;
    var addressID = req.params.addressID;
    pool.getConnection((err,conn) => {
      if(err) { console.log(err); }
      else {
        var sql = "UPDATE tbaddress SET tbCustomer_customerID = ?, addressNumber = ?, address = ?, addressDetail = ? WHERE addressID = ? "
        conn.query(sql, [customerID, req.body.addressNumber, req.body.address, req.body.addressDetail, addressID], (err, result) => {
          conn.release();
          if(err) { console.log(err); }
          else if(result){
            res.send(200, {result : true});
          }
          else {
            res.send(400, {result : false})
          }
        })
      }
    })
});
  
  
//배송지 삭제
router.delete('/:addressID', function(req, res, next) {
  var addressID = req.params.addressID;
  pool.getConnection((err,conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "DELETE FROM tbAddress WHERE addressID = ?"
      conn.query(sql, [addressID], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else if(result){
          res.send(200, {result : true});
        }
        else {
          res.send(400, {result : false})
        }
      })
    }
  })
});
  
//배송지 조회
router.get('/:customerID', function(req, res, next) {
    var customerID = req.params.customerID;
    pool.getConnection((err,conn) => {
      if(err) { console.log(err); }
      else {
        var sql = "SELECT * FROM tbAddress WHERE tbCustomer_customerID = ?"
        conn.query(sql, [customerID], (err, result) => {
          conn.release();
          if(err) { console.log(err); }
          else {
            res.send(result);
          }
        })
      }
    })
});

//배송지 주소아이디로 조회
router.get('/update/:addressID', function(req, res, next) {
  var addressID = req.params.addressID;
  pool.getConnection((err,conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbAddress WHERE addressID = ?"
      conn.query(sql, [addressID], (err, result) => {
        conn.release();
        if(err) { console.log(err); }
        else {
          res.send(result);
        }
      })
    }
  })
});

module.exports = router;