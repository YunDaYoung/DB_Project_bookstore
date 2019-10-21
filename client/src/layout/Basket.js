import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Basket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basketList : [], 
            customerID : window.sessionStorage.getItem('customerID')
        }
    }

    componentWillMount = () => {
        fetch("http://localhost:4000/basket/" + this.state.customerID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ basketList: data })
            })
    }

    render() {
        console.log(this.state.basketList);
        const list = this.state.basketList.map(item => (
            <tr>
                <td>{item.basketID}</td>
                <td>{item.createDate}</td>
                <td><Link to = "/basketDetail" style={{ color:'black', textDecoration: 'none' }}>상세보기</Link></td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default Basket;