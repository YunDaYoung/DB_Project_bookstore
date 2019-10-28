import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class addressRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressID : window.sessionStorage.getItem("addressID"), 
            customerID : window.sessionStorage.getItem("customerID"),

            addressNumber : "",
            address : "",
            addressDetail : ""
        }
    }

    componentWillMount = () => {
        if(window.sessionStorage.getItem("updateCode") == 1) {
            fetch("http://localhost:4000/address/update/" + this.state.addressID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ 
                    addressNumber : data[0].addressNumber,
                    address : data[0].address,
                    addressDetail : data[0].addressDetail
                 })
                 console.log(this.state.addressNumber)
            })
        }
    }


    addressData = () => {
        const data = {
            addressID : this.state.addressID,
            tbCustomer_customerID : this.state.customerID,
            addressNumber : this.state.addressNumber,
            address : this.state.address,
            addressDetail : this.state.addressDetail
        }
        if(window.sessionStorage.getItem("updateCode") == 1) {
            fetch("http://localhost:4000/address/" + this.state.customerID + "/" + this.state.addressID, {
            method : "PUT", 
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
        else{
            fetch("http://localhost:4000/address/" + this.state.customerID, {
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
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div>우편번호</div>
                <input name="addressNumber" placeholder={this.state.addressNumber} type="text" value = {this.state.addressNumber} onChange={this.handleChange}></input><br />
                <div>주소</div>
                <input name="address" placeholder={this.state.address} type="text" value = {this.state.address} onChange={this.handleChange}></input><br />
                <div>상세주소</div>
                <input name="addressDetail" placeholder={this.state.addressDetail} type="text" value = {this.state.addressDetail} onChange={this.handleChange}></input><br />
                {window.sessionStorage.getItem("updateCode") == 1 ? 
                <button name="addressData" type = "button" onClick = {this.addressData}><Link to = "/address" style={{ color:'black', textDecoration: 'none' }}>수정</Link></button> :
                <button name="addressData" type = "button" onClick = {this.addressData}><Link to = "/address" style={{ color:'black', textDecoration: 'none' }}>등록</Link></button>}<br/>
                <button name="cancel" type = "button"><Link to = "/address" style={{ color:'black', textDecoration: 'none' }}>취소</Link></button>
            </div>
        );
    }
}

export default addressRegister;