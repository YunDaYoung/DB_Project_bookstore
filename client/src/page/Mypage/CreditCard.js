import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreditCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardNumber : "",
            cardList : [],
            customerID : window.sessionStorage.getItem('customerID')
        }
    }

    componentWillMount = () => {
        fetch("http://localhost:4000/creditcard/" + this.state.customerID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.result){
                    this.setState({ cardList: data })
                }
                else{ console.log("result is null")}
            })
    }

    deleteCard = () => {
        const cardNumber = window.sessionStorage.getItem('cardNumber');
        fetch("http://localhost:4000/creditcard/" + cardNumber, {
            method : "DELETE"
            }).then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.result){
                    alert("success");
                }
                else {
                    alert("fail");
                }
            })
    }

    pushData = (data) => {
        window.sessionStorage.setItem('cardNumber', data);
    }
    

    render() {
        console.log(this.state.cardList);
        const list = this.state.cardList.map(item => (
            <tr key={item.cardNumber} onClick={() => this.pushData(item.cardNumber)}>
                <td>{item.cardNumber}</td>
                <td>{item.cardExpiry}</td>
                <td>{item.cardType}</td>
                <td><button type = "button" onClick = {this.deleteCard}>삭제</button></td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
                <button type = "button"><Link to = "/cardRegister" style={{ color:'black', textDecoration: 'none' }}>등록</Link></button>
            </div>
        );
    }
}

export default CreditCard;