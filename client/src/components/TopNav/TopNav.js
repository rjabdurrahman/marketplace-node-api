import React, { Component } from 'react';
import axios from 'axios';
import './TopNav.css';
import Notification from '../Notification/Notification';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logged: global.localStorage.getItem('user') ? true : false,
            type: global.localStorage.getItem('user') ? JSON.parse(global.localStorage.getItem('user')).type : 0,
            mobileNav: !(window.visualViewport.width < 993),
            mobileLogin: !(window.visualViewport.width < 993)
        }
        // if (global.localStorage.getItem('user') && global.location.pathname != "/create-post")
        //     global.location.href = "/create-post";
    }
    usernameInputHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    passwordInputHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/users/login', { username: this.state.username, password: this.state.password })
            .then(res => {
                this.setState({ logged: true });
                this.setState({ type: res.data.type });
                global.localStorage.setItem('user', JSON.stringify(res.data));
                Notification('You are Logged Successfully!', 1);
                global.location.href = "/";
            })
            .catch(err => {
                Notification('Username or Password is Incorrect!', 2);
            });
    }

    logOutHandler = () => {
        Notification('You are Logged Out Successfully!', 1);
        this.setState({ logged: false });
        global.localStorage.removeItem('user');
    }

    render() {
        return (
            <>
                <header className="header-nav">
                    <div className="brand-logo">
                        <a href="/">
                            <h2 style={{ margin: '0' }} className="pac-font">TenStartup</h2>
                        </a>
                    </div>
                    <div className="auth flex">
                        {this.state.mobileLogin && (<div className="login-form" style={this.state.logged ? { display: 'none' } : { display: 'block' }}>
                            <form className="flex top-login" onSubmit={this.submitHandler}>
                                <input type="text" className="w3-input" placeholder="Username" name="username" value={this.state.username} onChange={this.usernameInputHandler} required />
                                <input type="password" className="w3-input w3-border w3-border-left" placeholder="Password" name="password" value={this.state.password} onChange={this.passwordInputHandler} required />
                                <button>Login</button>
                            </form>
                        </div>)}
                        <div style={this.state.logged ? { display: 'block' } : { display: 'none' }} className="w3-dropdown-hover">
                            <div className="user-btn">
                                <img src="https://profiles.utdallas.edu/img/default.png" alt="" />
                            </div>
                            <div className="w3-dropdown-content w3-bar-block w3-border">
                                <a href="/profile" className="w3-bar-item w3-button">PROFILE</a>
                                <a href="/" className="w3-bar-item w3-button" onClick={this.logOutHandler}>LOG OUT</a>
                            </div>
                        </div>
                        {(this.state.logged && <div className="mobile-nav" onClick={() => this.setState({...this.state, mobileNav: !this.state.mobileNav})}>
                            <span className="material-icons">
                                menu
                            </span>
                        </div>)}
                        {(!this.state.logged && <div className="mobile-nav" onClick={() => this.setState({...this.state, mobileLogin: !this.state.mobileLogin})}>
                            <span className="material-icons">
                                login
                            </span>
                        </div>)}
                    </div>
                    {(this.state.mobileNav && this.state.logged && this.state.type === 1) && <div className="user-menu w3-bar">
                        <a href="/" className="w3-bar-item w3-button">HOME</a>
                        <a href="/create-post" className="w3-bar-item w3-button">CREATE POST</a>
                        <a href="/posts" className="w3-bar-item w3-button">OVERVIEW</a>
                        <a href="/my-feeds" className="w3-bar-item w3-button">MY FEEDS</a>
                        <a href="/" className="w3-bar-item w3-button">MESSAGES</a>
                    </div>}
                    {(this.state.mobileNav && this.state.logged && this.state.type === 2) && <div className="user-menu w3-bar">
                        <a href="/" className="w3-bar-item w3-button">HOME</a>
                        <a href="/posts" className="w3-bar-item w3-button">FEEDS</a>
                        <a href="/invs" className="w3-bar-item w3-button">REPORTS</a>
                        <a href="/" className="w3-bar-item w3-button">MESSAGES</a>
                    </div>}
                </header>
            </>
        );
    }
}

export default TopNav;