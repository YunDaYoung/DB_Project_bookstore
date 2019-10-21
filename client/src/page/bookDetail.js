import React, { Component } from 'react';

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
                <button type = "button">주문</button>
                <button type = "button">장바구니</button>
            </div>
        );
    }
}

export default bookDetail;