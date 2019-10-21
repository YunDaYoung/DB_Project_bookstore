import React, { Component } from 'react';

class basketDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basketDetailList : []
        }
    }

    componentWillMount = () => {
        fetch("http://localhost:4000/basket/detail/" + "2")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ basketDetailList : data })
            })
    }

    render() {
        console.log(this.state.basketDetailList);
        const list = this.state.basketDetailList.map(item => (
            <tr>
                <td><img src = {item.bookImage}></img></td>
                <td>{item.bookName}</td>
                <td>{item.bookPrice}</td>
                <td>{item.bookStock}</td>
                <td>{item.bookAuthor}</td>
                <td>{item.basketBookQTY}</td>
            </tr>
        ))
        return (
            <div>
                <div>{list}</div>
            </div>
        );
    }
}

export default basketDetail;