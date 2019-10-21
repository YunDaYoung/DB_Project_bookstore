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

    pushData = (data) => {
        window.sessionStorage.setItem("basketID", data);
    }

    render() {
        const list = this.state.basketList.map(item => (
            <tr key={item.basketID} onClick={() => this.pushData(item.basketID)}>
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