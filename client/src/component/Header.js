import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <div>
                <div className = "title"><Link to = "/" style={{ color:'white', textDecoration: 'none' }}>Bookstore</Link></div>
                <div className = "menu">
                    {this.props.log ? 
                    <div>
                        <div className = "menu-item"><Link to = "/" onClick={this.props.logout} style={{ color:'white', textDecoration: 'none' }}>Logout</Link></div>
                        <div className = "menu-item"><Link to = "/book" style={{ color:'white', textDecoration: 'none' }}>Book</Link></div>
                        <div className = "menu-item"><Link to = "/order" style={{ color:'white', textDecoration: 'none' }}>Order</Link></div>
                        <div className = "menu-item"><Link to = "/basket" style={{ color:'white', textDecoration: 'none' }}>Basket</Link></div>
                        <div className = "menu-item"><Link to = "/mypage" style={{ color:'white', textDecoration: 'none' }}>Mypage</Link></div>
                    </div> :
                    <div className = "menu-item"><Link to = "/auth" style={{ color:'white', textDecoration: 'none' }}>Login/Auth</Link></div>
                    }
                </div>
                </div>
            </div>
        );
    }
}

export default Header;