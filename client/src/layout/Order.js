import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OrderDetail} from '../page'

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderList : [],
            customerID : window.sessionStorage.getItem('customerID'),
            orderID : ""
        }
    }

    componentWillMount = () => {
        fetch("http://localhost:4000/order/" + this.state.customerID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ orderList: data })
            })
    }

    deleteOrder = () => {
        fetch("http://localhost:4000/order/" + this.state.customerID,{
            method: 'DELETE'
            }).then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ orderList: data })
            })
    }

    pushData = (data) => {
        window.sessionStorage.setItem("orderID", data);
    }

    render() {
        console.log(this.state.orderList);
        const list = this.state.orderList.map(item => (
            <tr key={item.orderID} onClick={() => this.pushData(item.orderID)}>
                <td>{item.orderID}</td>
                <td>{item.addressNumber}</td>
                <td>{item.address}</td>
                <td>{item.addressDetail}</td>
                <td>{item.orderDate}</td>
                <td>{item.cardNumber}</td>
                <td>{item.cardExpiry}</td>
                <td>{item.cardType}</td>
                <td>{item.totalPrice}</td>
                <td><button><Link to = "/orderDetail" style={{ color:'black', textDecoration: 'none' }}>상세보기</Link></button></td>
                <td><button onClick = {this.deleteOrder} ><Link to = "/order" style={{ color: 'black', textDecoration: 'none'}}>주문취소</Link></button></td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default Order;