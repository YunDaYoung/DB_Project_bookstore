import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// const styles = {
//     contentItem: {
//         width:150,
//         height:200,
//       },
//       contentImage: {
//         width:'99%',
//         height:'99%'
//       }
// }

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList : [],
        }
    }
    
    componentWillMount = () => {
        fetch("http://localhost:4000/book")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookList: data })
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
                <tb><Link to = "/bookDetail" style={{ color:'black', textDecoration: 'none' }}>상세보기</Link></tb>
            </tr>
        ))
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default Book;