var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//장바구니 조회
router.get('/:customerID', function (req, res, next) {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    else {
      var sql = "SELECT * FROM tbbasket WHERE tbCustomer_customerID = ?";
      conn.query(sql, [customerID], (err, result) => {
        conn.release();
        if (err) { console.log(err); }
        else {
          res.send(result);
        }
      })
    }
  })
});

//장바구니 등록
router.post('/:customerID', (req, res, next) => {
  var customerID = req.params.customerID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    var sql = 'INSERT INTO tbbasket(tbCustomer_customerID) VALUES (?)';
    conn.query(sql, [customerID], (err, result) => {
      conn.release();
      if (err) { console.log(err); }
      else if (result) {
        res.send(200, { result: true })
      }
      else {
        res.send(400, { result: false })
      }
    })
  })
})

//장바구니 수정
router.put('/:customerID/:basketID', (req, res, next) => {
  var customerID = req.params.customerID;
  var basketID = req.params.basketID;
  pool.getConnection((err, conn) => {
    if (err) res.status(500).send({ result: false })
    var sql = 'UPDATE tbbasket SET tbcustomer_customerID= ? WHERE basketID= ?';
    conn.query(sql, [customerID, basketID], (err, result) => {
      conn.release();
      if (err) { console.log(err); }
      else if (result) {
        res.send(200, { result: true })
      }
      else {
        res.send(400, { result: false })
      }
    })
  })
})

//장바구니 삭제
router.delete('/:basketID', (req, res) => {
  var basketID = req.params.basketID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    var sql = 'DELETE FROM tbbasket WHERE basketID= ?';
    conn.query(sql, [basketID], (err, result) => {
      conn.release();
      if (err) { console.log(err); }
      else if (result) {
        res.send(200, { result: true })
      }
      else {
        res.send(400, { result: false })
      }
    })
  })
})

//장바구니 상세 조회
router.get('/detail/:basketID', function(req, res, next) {
  var basketID = req.params.basketID;
  pool.getConnection((err, conn) => {
      if (err) res.status(500).send({ result: false })
      var sql = "SELECT * FROM tbbasketdetail, tbbook, tbbasket WHERE tbbasket.basketID = tbbasketdetail.tbBasket_basketID AND tbbasketdetail.tbBook_bookID = tbbook.bookID AND tbBasket_basketID = ?";
      conn.query(sql, [basketID], (err, result) => {
        conn.release();
        if (err) {console.log(err);}
        else{
          res.send(result);
        }
      })
    })
});

//장바구니 상세 등록
router.post('/detail/:basketID', function (req, res, next) {
  var basketID = req.params.basketID;
  pool.getConnection((err, conn) => {
    if (err) {console.log(err);}
    else {
      var sql = 'INSERT INTO tbbasketdetail(tbBook_bookID, basketBookQTY, tbBasket_basketID) VALUES (?, ?, ?)';
      conn.query(sql, [req.body.tbBook_bookID, req.body.basketBookQTY, basketID], (err, result) => {
        conn.release();
        if (err) {console.log(err);}
        else if (result) {
          res.send(200, {result: true})
        }
        else {
          res.send(400, {result: false})
        }
      })
    }
  })
})

//장바구니 상세 수정
router.put('/detail/:basketID/:bookID', function (req, res, next){
  var basketID = req.params.basketID;
  var bookID = req.params.bookID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    var sql = "UPDATE tbbasketdetail SET basketBookQTY= ? WHERE tbBook_bookID=? AND tbBasket_basketID = ?"
    conn.query(sql, [req.body.basketBookQTY, bookID, basketID], (err, result) => {
      conn.release();
      if (err) { console.log(err); }
      else if (result) {
        res.send(200, { result: true })
      }
      else {
        res.send(400, { result: false })
      }
    })
  })
})

//장바구니 상세 삭제
router.delete('/detail/:basketID/:bookID', function (req, res, next){
  var basketID = req.params.basketID;
  var bookID = req.params.bookID;
  pool.getConnection((err, conn) => {
    if (err) { console.log(err); }
    else {
      var sql = "DELETE FROM tbbasketdetail WHERE tbBook_bookID= ? AND `tbBasket_basketID`= ?"
      conn.query(sql, [bookID, basketID], (err, result) => {
        conn.release();
        if (err) { console.log(err); }
        else if (result) {
          res.send(200, { result: true })
        }
        else {
          res.send(400, { result: false })
        }
      })
    }
  })
})

module.exports = router;