import React, { Component } from 'react';

class orderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderDetailList : []
        }
    }

    componentWillMount = () => {
        fetch("http://localhost:4000/order/detail/" + this.props.orderID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ orderDetailList : data })
            })
    }

    render() {
        console.log(this.state.orderDetailList);
        const list = this.state.orderDetailList.map(item => (
            <tr>
                <td><img src = {item.bookImage}></img></td>
                <td>{item.bookName}</td>
                <td>{item.bookPrice}</td>
                <td>{item.bookStock}</td>
                <td>{item.bookAuthor}</td>
                <td>{item.bookQTY}</td>
                
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default orderDetail;