import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class orderRegister extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookList : [],

            addressNumber : "",
            address : "",
            addressDetail : "",

            cardNumber : "",
            cardExpiry : "",
            cardType : ""
        }
    }

    

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount = () => {
        if(window.sessionStorage.getItem("orderCode") == 1){
            fetch("http://localhost:4000/book/" + window.sessionStorage.getItem("bookID"))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookList: data })
            })
        }
        else if(window.sessionStorage.getItem("orderCode") == 2){
            fetch("http://localhost:4000/basket/" + window.sessionStorage.getItem("customerID"))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookList: data })
            })
            fetch("http://localhost:4000/book/" + window.sessionStorage.getItem("bookID"))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookList: data })
            })
        }
    }

    postOrder = () => {
        console.log(this.state.bookList[0].bookPrice)
        const data = {
            addressNumber : this.state.addressNumber, 
	        address :  this.state.address, 
	        addressDetail : this.state.addressDetail, 
	        cardNumber : this.state.cardNumber,
	        cardExpiry : this.state.cardExpiry,
	        cardType : this.state.cardType,
	        totalPrice : ""
        }
        fetch("http://localhost:4000/order/" + window.sessionStorage.getItem("customerID"), {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data), 
        }).then((response) => {
            return response.json();
        }).then(res => { 
            if(res.result){
                alert("Success");
            }
            else{
                alert("fail");
            }
        })
    }

    render() {
        const list = this.state.bookList.map(item => (
            <tr>
                <tb><img src = {item.bookImage}></img></tb>
                <td>{item.bookName}</td>
                <td>{item.bookPrice}</td>
                <td>{item.bookAuthor}</td>
            </tr>
        ))
        return (
            <div>
                <div>
                    <div>{list}</div>
                    <h3>주문</h3>
                    <h4>배송지 입력</h4>
                    <input name="addressNumber" placeholder="우편번호 입력" type="text" value = {this.state.addressNumber} onChange={this.handleChange}></input><br />
                    <input name="address" placeholder="주소 입력" type="text" value = {this.state.address} onChange={this.handleChange}></input><br />
                    <input name="addressDetail" placeholder="상세주소 입력" type="text" value = {this.state.addressDetail} onChange={this.handleChange}></input><br />
                    <h4>카드정보 입력</h4>
                    <input name="cardNumber" placeholder="카드번호 입력" type="text" value = {this.state.cardNumber} onChange={this.handleChange}></input><br />
                    <input name="cardExpiry" placeholder="카드 유효기간 입력" type="text" value = {this.state.cardExpiry} onChange={this.handleChange}></input><br />
                    <input name="cardType" placeholder="카드유형 입력" type="text" value = {this.state.cardType} onChange={this.handleChange}></input><br />
                    <button name="register" type = "button" onClick = {this.postOrder}><Link to = "/order" style={{ color:'black', textDecoration: 'none' }}>주문</Link></button>
                    <button name="cancel" type = "button">취소</button>
                </div>
            </div>
        );
    }
}

export default orderRegister;