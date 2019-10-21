import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { default as OrderDetail} from '../page/orderDetail'

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderList : [],
            customerID : window.sessionStorage.getItem('customerID')
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

    render() {
        console.log(this.state.orderList);
        const list = this.state.orderList.map(item => (	
            <tr key={item.orderID}>
                <td>{item.orderID}</td>
                <td>{item.addressNumber}</td>
                <td>{item.address}</td>
                <td>{item.addressDetail}</td>
                <td>{item.orderDate}</td>
                <td>{item.cardNumber}</td>
                <td>{item.cardExpiry}</td>
                <td>{item.cardType}</td>
                <td>{item.totalPrice}</td>
                <td><Link to = "/orderDetail" style={{ color:'black', textDecoration: 'none' }}>상세보기</Link></td>
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