import React, { Component } from 'react';

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
        fetch("http://localhost:4000/book/search/" + this.props.bookName)
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
                {list}
            </div>
        );
    }
}

export default Book;