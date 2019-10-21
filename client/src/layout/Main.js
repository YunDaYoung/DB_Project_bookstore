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

    render() {
        return (
            <div>
                <input name="inputValue" placeholder="도서명 입력" type="text" value = {this.state.inputValue} onChange={this.handleChange}></input>
                <button name="search" type = "button" onClick = {this.search}><div><Link to = "/book" style={{ color:'black', textDecoration: 'none' }}>>검색</Link></div></button>
            </div>
        );
    }
}

export default Main;