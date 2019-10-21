import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    signUp = () => {
        const data = {
            customerID : this.state.signUpcustomerID, 
            password : this.state.signUpPassword,
            customerName : this.state.signUpcustomerName
        }
        this.props.signUp(data);
    }

    signIn = () => {
        const data = {
            customerID : this.state.logincustomerID, 
            password : this.state.loginPassword
        }
        this.props.login(data);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    state = {
        signUpcustomerID : "",
        signUpPassword : "",
        signUpcustomerName : "",

        logincustomerID : "",
        loginPassword : ""
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Sign Up</h3>
                    <input name="signUpcustomerID" placeholder="아이디" type="text" value = {this.state.signUpcustomerID} onChange={this.handleChange}></input><br />
                    <input name="signUpPassword" placeholder="비밀번호" type="password" value = {this.state.signUpPassword} onChange={this.handleChange}></input><br />
                    <input name="signUpcustomerName" placeholder="이름" type="text" value = {this.state.signUpcustomerName} onChange={this.handleChange}></input><br />
                    <button name="signUp" type = "button" onClick = {this.signUp}>회원가입</button><br/>
                </div>
                <div>
                    <h3>Sign In</h3>
                    <input name="logincustomerID" placeholder="아이디" type="text" value = {this.state.logincustomerID} onChange={this.handleChange}></input><br />
                    <input name="loginPassword" placeholder="비밀번호" type="password" value = {this.state.loginPassword} onChange={this.handleChange}></input><br />
                    <button name="sighIn" type = "button" onClick = {this.signIn}>로그인</button><br/>
                </div>
            </div>
        );
    }
}

export default Auth;