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
        console.log(this.props.logged);
        if(this.props.logged){
            window.sessionStorage.setItem("bookName", this.state.inputValue);
        }
        else{
            this.state.changeLink = "/auth"
            alert("Login please");
        }
    }

    render() {
        return (
            <div>
                <input name="inputValue" placeholder="도서명 입력" type="text" value = {this.state.inputValue} onChange={this.handleChange}></input>
                <button name="search" type = "button" onClick = {this.searchBook}>
                { this.props.logged ?
                <Link to = "/search" style={{ color:'black', textDecoration: 'none' }}>검색</Link> :
                <Link to = "/auth" style={{ color:'black', textDecoration: 'none' }}>검색</Link>}</button>
            </div>
        );
    }
}

export default Main;