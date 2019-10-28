import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue : ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchBook = () => {
        window.sessionStorage.setItem("bookName", this.state.inputValue);
    }

    render() {
        return (
            <div>
                {this.props.logged ?
                <div>
                    <input name="inputValue" placeholder="도서명 입력" type="text" value = {this.state.inputValue} onChange={this.handleChange}></input>
                    <button name="search" type = "button" onClick = {this.searchBook}><Link to = "/search" style={{ color:'black', textDecoration: 'none' }}>검색</Link></button>
                </div> : 
                <div><h1>Welcome to visit Bookstore</h1><h3>please Login</h3></div>

                }
            </div>
        );
    }
}

export default Main;