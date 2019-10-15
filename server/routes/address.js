var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//배송지 등록
router.post('/register', function(req, res, next) {
    pool.getConnection((err, conn) => {
      if(err) { console.log(err); }
      else {
        var sql1 = "INSERT INTO tbaddressdetail(addressNumber, address, addressDetail) VALUES (?, ?, ?)"
        conn.query(sql1, [req.body.addressNumber, req.body.address, req.body.addressDetail], (err, result) => {
          if(err) { console.log(err); res.send({result : false})}
          else {
              var sql2 = "SELECT LAST_INSERT_ID() as indexNum"
              conn.query(sql2, (err, result) => {
                  if(err) { console.log(err); res.send({result : false})}
                  else {
                    
                  }
              })
          }
        });
      }
    });
});
  
//배송지 수정
router.put('/update/:addressID', function(req, res, next) {
    var addressID = req.params.addressID;
    pool.getConnection((err,conn) => {
      if(err) { console.log(err); }
      else {
        var sql = "UPDATE tbaddress set tb"
      }
    })
});
  
  
//배송지 삭제
router.delete('/', function(req, res, next) {
    res.send('respond with a resource');
});
  
//배송지 조회
router.get('/', function(req, res, next) {
    res.body("hello world");
});

module.exports = router;