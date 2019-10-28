import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreditCardRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerID : window.sessionStorage.getItem("customerID"),
            
            cardNumber : "", 
            cardExpiry : "",
            cardType : ""
        }
    }

    cardData = () => {
        const data = {
            cardNumber : this.state.cardNumber,
            cardExpiry : this.state.cardExpiry,
            cardType : this.state.cardType
        }
            fetch("http://localhost:4000/creditcard/" + this.state.customerID, {
            method : "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            }).then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.result){
                    alert("success");
                }
                else{
                    alert("fail");
                }
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div>카드번호</div>
                <input name="cardNumber" placeholder={this.state.cardNumber} type="text" value = {this.state.cardNumber} onChange={this.handleChange}></input><br />
                <div>카드 유효기간</div>
                <input name="cardExpiry" placeholder={this.state.cardExpiry} type="text" value = {this.state.cardExpiry} onChange={this.handleChange}></input><br />
                <div>카드종류</div>
                <input name="cardType" placeholder={this.state.cardType} type="text" value = {this.state.cardType} onChange={this.handleChange}></input><br />
                <button name="addressData" type = "button" onClick = {this.cardData}><Link to = "/card" style={{ color:'black', textDecoration: 'none' }}>등록</Link></button><br/>
                <button name="cancel" type = "button"><Link to = "/card" style={{ color:'black', textDecoration: 'none' }}>취소</Link></button>
            </div>
        );
    }
}

export default CreditCardRegister;