import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList : [],
            bookName : window.sessionStorage.getItem("bookName")
        }
    }

    
    
    componentWillMount = () => {
        /*
        fetch("http://localhost:4000/book/search/" + this.state.bookName)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookList: data })
            })
            */
           fetch("http://localhost:4000/book")
           .then(response => {
               return response.json();
           })
           .then(data => {
                console.log(data);
                data = data.filter(item => {
                    return item.bookName.includes(this.state.bookName)
                })
                this.setState({ bookList: data })
                console.log(this.state.bookList);    
           })
    }

    pushData = (data) => {
        window.sessionStorage.setItem("bookID", data);
    }

    render() {
        const list = this.state.bookList.map(item => (
            <tr key={item.bookID} onClick={() => this.pushData(item.bookID)}>
                <tb><img src = {item.bookImage}></img></tb>
                <td>{item.bookName}</td>
                <td>{item.bookAuthor}</td>
                <td>{item.bookPrice}</td>
                <td><Link to = "/bookDetail" style={{ color:'black', textDecoration: 'none' }}>상세보기</Link></td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default Search;