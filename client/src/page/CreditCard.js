import React, { Component } from 'react';

class CreditCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                this.setState({ cardList: data })
            })
    }

    render() {
        console.log(this.state.cardList);
        const list = this.state.cardList.map(item => (
            <tr>
                <td>{item.cardNumber}</td>
                <td>{item.cardExpiry}</td>
                <td>{item.cardType}</td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default CreditCard;