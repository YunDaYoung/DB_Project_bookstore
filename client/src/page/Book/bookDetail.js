import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class bookDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList : [],
            bookID : window.sessionStorage.getItem("bookID")
        }
    }
    
    componentWillMount = () => {
        fetch("http://localhost:4000/book/" + this.state.bookID)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookList: data })
            })
    }

    pushData = () => {
        window.sessionStorage.setItem("orderCode", 1);
        window.sessionStorage.setItem("bookID", this.state.bookID);
    }

    render() {
        const list = this.state.bookList.map(item => (
            <tr>
                <tb><img src = {item.bookImage}></img></tb>
                <td>{item.bookName}</td>
                <td>{item.bookPrice}</td>
                <td>{item.bookStock}</td>
                <td>{item.bookAuthor}</td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
                <input name="bookQTY" placeholder="수량 입력" type="text"></input><br/>
                <button type = "button" onClick = {this.pushData}><Link to ="/orderRegister" style = {{color : "black", textDecoration: 'none'}}>주문</Link></button>
                <button type = "button">장바구니</button>
            </div>
        );
    }
}

export default bookDetail;