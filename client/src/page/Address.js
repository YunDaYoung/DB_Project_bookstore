import React, { Component } from 'react';

class Address extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddressList : [],
            customerID : window.sessionStorage.getItem('customerID')
        }
    }

    componentWillMount = () => {
        console.log(this.props.customerID);
        fetch("http://localhost:4000/address/" + this.state.customerID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ AddressList: data })
            })
    }

    render() {
        console.log(this.state.AddressList);
        const list = this.state.AddressList.map(item => (
            <tr>
                <td>{item.AddressID}</td>
                <td>{item.AddressNumber}</td>
                <td>{item.address}</td>
                <td>{item.addressDetail}</td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default Address;