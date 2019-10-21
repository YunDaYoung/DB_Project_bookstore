import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main, Auth, Basket, Book, Order, Mypage } from './layout'
import { OrderDetail, BasketDetail, Search, Address, Card, BookDetail} from './page'
import { default as Header} from './component/Header'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout

    }
  }

  onLogin = () => {
    this.setState({
      logged : true
    })
  }

  onLogout = () => {
    this.setState({
      logged : false
    })
  }

  _reqLogin = (data) => {
    fetch("http://localhost:4000/customer/signIn", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
    }).then(res => {
      console.log(res);
      if(res.result){
        alert("success")
        this.state.onLogin();
        console.log(this.state.logged);
        window.sessionStorage.setItem('customerID', res.memberID);
        window.sessionStorage.setItem('customerName', res.memberName);
      }
      else {
        alert("fail");
      }
    })
  }

  _reqSignUp = (data) => {
    fetch("http://localhost:4000/customer/signUp", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data), 
        }).then((response) => {
            return response.json();
        }).then(res => { 
            if(res.result){
                alert("Success");
            }
            else{
                alert("fail");
            }
        })
  }

  _reqLogout = () => {
    this.state.onLogout();
    window.sessionStorage.clear();
  }


  render(){
    return (
      <div>
        <Router>
          <Header log = {this.state.logged} logout = {this._reqLogout}></Header>
          <Route path='/' exact render={props => (<Main logged = {this.state.logged}/>)}></Route>
          <Route path='/auth' exact render={props => (<Auth login={this._reqLogin} signUp={this._reqSignUp} logged = {this.state.logged}/>)}></Route>
          <Route path='/book' exact render={props => (<Book/>)}></Route>
          <Route path='/basket' exact render={props => (<Basket {...this.state}/>)}></Route>
          <Route path='/order' exact render={props => (<Order/>)}></Route>
          <Route path='/mypage' exact render={props => (<Mypage/>)}></Route>

          <Route path='/address' exact render={props => (<Address/>)}></Route>
          <Route path='/card' exact render={props => (<Card/>)}></Route>
          <Route path='/bookDetail' exact render={props => (<BookDetail/>)}></Route>
          <Route path='/orderDetail' exact render={props => (<OrderDetail />)}></Route>
          <Route path='/basketDetail' exact render={props => (<BasketDetail />)}></Route>
          <Route path='/search' exact render={props => (<Search />)}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
