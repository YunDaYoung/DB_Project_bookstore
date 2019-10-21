import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Mypage extends Component {
    render() {
        return (
            <div>
                <button name = "Address" type = "button"><Link to = "/address" style={{ color:'black', textDecoration: 'none' }}>배송지 정보</Link></button>
                <button name = "CreditCard" type = "button" style={{ color:'black', textDecoration: 'none' }}><Link to = "/card" style={{ color:'black', textDecoration: 'none' }}>신용카드 정보</Link></button>
            </div>
        );
    }
}

export default Mypage;