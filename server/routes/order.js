var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//사용자별 주문조회
router.get('/:customerID', function (req, res, next) {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    var sql = "SELECT * FROM tborder WHERE tbCustomer_customerID = ?"
    conn.query(sql, [customerID], (err, result) => {
      conn.release();
      if (err) { console.log(err); }
      else {
        res.send(result);
      }
    })
  })
});

//주문 상세조회
router.get('/detail/:orderID', function (req, res, next) {
  var orderID = req.params.orderID;
  pool.getConnection((err, conn) => {
    var sql = "SELECT * FROM `tborder`,`tborderdetail`,`tbbook` WHERE tborder.orderID = tborderdetail.tbOrder_orderID AND tborderdetail.tbBook_bookID = tbbook.bookID AND tborder.orderID = ?"
    conn.query(sql, [orderID], (err, result) => {
      conn.release();
      if (err) { console.log(err); }
      else {
        res.send(result);
      }
    })
  })
})

//주문 등록
router.post('/:customerID', function (req, res, next) {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    else {
      var sql = "INSERT INTO tborder(tbCustomer_customerID, addressNumber, address, addressDetail, cardNumber, cardExpiry, cardType, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      conn.query(sql, [customerID, req.body.addressNumber, req.body.address, req.body.addressDetail, req.body.cardNumber, req.body.cardExpiry, req.body.cardType, req.body.totalPrice], (err, result) => {
        if (err) { console.log(err); }
        else {
          res.send({ result: true });
        }
      });
    }
  });
});

//주문 상세 등록
router.post('/detail/:orderID', function (req, res, next) {
  var orderID = req.params.orderID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    else {
      var sql = "INSERT INTO tborderdetail(tbOrder_orderID, tbBook_bookID, bookQTY) VALUES (?, ?, ?)"
      conn.query(sql, [orderID, req.body.tbBook_bookID, req.body.bookQTY], (err, result) => {
        conn.release();
        if (err) { console.log(err); }
        else {
          res.send({ result: true });
        }
      });
    }
  });
});

//주문 수정
router.put('/:customerID/:orderID', function (req, res, next) {
  var customerID = req.params.customerID;
  var orderID = req.params.orderID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    else {
      var sql = "UPDATE tborder SET tbCustomer_customerID = ?, addressNumber = ?, address = ?, addressDetail = ?, cardNumber = ?, cardExpiry = ?, cardType = ?, totalPrice = ? WHERE orderID = ?"
      conn.query(sql, [customerID, req.body.addressNumber, req.body.address, req.body.addressDetail, req.body.cardNumber, req.body.cardExpiry, req.body.cardType, req.body.totalPrice, orderID], (err, result) => {
        conn.release();
        if (err) { console.log(err); }
        else {
          res.send({ result: true });
        }
      })
    }
  })
})

//주문 상세 수정

//주문 삭제
router.delete('/:orderID', function (req, res, next) {
  var orderID = req.params.orderID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    else {
      var sql = "DELETE FROM tborder WHERE orderID = ?"
      conn.query(sql, [orderID], (err, result) => {
        conn.release();
        if (err) { console.log(err); }
        else {
          res.send({ result: true });
        }
      })
    }
  })
})

//주문 상세 삭제

module.exports = router;