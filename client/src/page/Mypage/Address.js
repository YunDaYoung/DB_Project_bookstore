import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Address extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressID : "",
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

    deleteAddress = () => {
        const addressID = window.sessionStorage.getItem("addressID");
        fetch("http://localhost:4000/address/" + addressID, {
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
        window.sessionStorage.setItem("updateCode", 1);
        window.sessionStorage.setItem("addressID", data);
    }

    pushData2 = () => {
        window.sessionStorage.setItem("updateCode", 0);
    }

    render() {
        console.log(this.state.AddressList);
        const list = this.state.AddressList.map(item => (
            <tr key={item.addressID} onClick={() => this.pushData(item.addressID)}>
                <td>{item.addressID}</td>
                <td>{item.addressNumber}</td>
                <td>{item.address}</td>
                <td>{item.addressDetail}</td>
                <td><button type = "button"><Link to = "/addressRegister" style={{ color:'black', textDecoration: 'none' }}>수정</Link></button></td>
                <td><button type = "button" onClick = {this.deleteAddress}><Link to = "/address" style={{ color:'black', textDecoration: 'none' }}>삭제</Link></button></td>
            </tr>
        ))
        return (
            <div>
            <div>
                <div>{list}</div>
                <button type = "button" onClick = {this.pushData2}><Link to = "/addressRegister" style={{ color:'black', textDecoration: 'none' }}>등록</Link></button>
            </div>
            </div>
        );
    }
}

export default Address;