var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//사용자별 주문조회
router.get('/:customerID', function(req, res, next) {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    var sql = "SELECT * FROM tborder WHERE tbCustomer_customerID = ?"
    conn.query(sql, [customerID], (err, result) => {
      if(err) { console.log(err); }
      else {
        res.send(result);
      }
    })
  })
});

//주문 등록
router.post('/:customerID', function(req, res, next) {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    if(err) { console.log(err); }
    else {
      var sql = "INSERT INTO tborder(tbCustomer_customerID, addressNumber, address, addressDetail, orderDate, cardNumber, cardExpiry, cardType, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      conn.query(sql, [customerID, req.body.addressNumber, req.body.address, req.body.addressDetail, req.body.orderDate, req.body.cardNumber, req.body.cardExpiry, req.body.cardType, req.body.totalPrice], (err, result) => {
        if(err) {console.log(err); }
        else{
          var sql2 = "INSERT INTO tb"
        }
      });
      
    }
  })
})

module.exports = router;