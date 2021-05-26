import React, { Component } from 'react'
import update from 'react-addons-update';
import axios from 'axios';
import Overlay from '../Overlay/Overlay';
import Vison from './Vison/Vison';
import store from '../../store';
import './Landing.css';
import Notification from '../Notification/Notification'

export class Landing extends Component {

    constructor() {
        super();
        this.regForm = React.createRef();
        this.state = {
            showRegister: false,
            regType: 'Startup',
            user: {
                username: '',
                email: '',
                password: '',
                type: 1
            },
            agree: false,
            confirmPassword: '',
            userType: global.localStorage.getItem('user') ? JSON.parse(global.localStorage.getItem('user')).type : 0
        }
    }

    inputHandler = (event) => {
        this.state.user[event.target.name] = event.target.value;
        this.setState({ user: this.state.user });
    }

    updateType = (n) => {
        console.log(store.getState());
        store.dispatch({ type: 'CLICK_ON_REGISTER', payload: true });
        console.log(store.getState());
        this.setState(
            { user: update(this.state.user, { type: { $set: n } }) }
        )
    }

    confirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.agree) {
            Notification('Please Agree Terms and Rules!', 2);
            return;
        }

        if(this.state.confirmPassword !== this.state.user.password) {
            Notification('Password doesn\'t match!', 2);
            return;
        }
        if(this.state.user.password.length < 6) {
            Notification('Password must be in 6 digits!', 2);
            return;
        }
        
        axios.post('http://localhost:5000/api/users/register', this.state.user)
            .then(res => {
                this.setState({
                    showRegister: false,
                    user: {
                        username: '',
                        email: '',
                        password: '',
                        type: 1
                    },
                    agree: false,
                    confirmPassword: ''
                });
                if(res.data._id) {
                    Notification('Registered Successfully!', 1);
                    this.regForm.current.reset();
                }
            })
            .catch(err => {
                Notification(err.message, 2);
            });
    }

    render() {
        return (
            <div>
                <Overlay>
                    <div style={this.state.userType === 0 ? { display: 'block' } : { display: 'none' }}>
                        <h1 className="ex-font landing-title">Get Started As A</h1>
                        <div className="link-contianers mont-font">
                            <button className="w3-btn main-bg-color" onClick={() => { this.setState({ showRegister: true, regType: 'Startup' }); this.updateType(1) }}>Startup</button>
                            <button className="w3-btn main-bg-color" onClick={() => { this.setState({ showRegister: true, regType: 'Experienced' }); this.updateType(2) }}>Experienced</button>
                        </div>
                    </div>
                    <div className="user-overlay" style={this.state.userType === 1 ? { display: 'block' } : { display: 'none' }}>
                        <h1 className="ex-font landing-title">Boost Your Business</h1>
                        <div className="link-contianers mont-font">
                            <a href="/create-post" className="w3-btn main-bg-color">Create New Post</a>
                            <a href="/posts" className="w3-btn w3-white">Show Experienced</a>
                        </div>
                    </div>
                    <div className="user-overlay type-2" style={this.state.userType === 2 ? { display: 'block'} : { display: 'none' }}>
                        <h1 className="ex-font landing-title">Provide Your Experience</h1>
                        <div className="link-contianers mont-font">
                            <a href="/profile" className="w3-btn w3-white">Create Profile</a>
                            <a href="/posts" className="w3-btn main-bg-color">Show Recent Feeds</a>
                        </div>
                    </div>
                </Overlay>
                {/* Register Start */}
                <div className="w3-modal" style={this.state.showRegister ? { display: 'block' } : { display: 'none' }}>
                    <div className="w3-modal-content w3-animate-zoom div-box" style={{ backgroundColor: 'transparent' }}>
                        <div className="w3-light-gray w3-card-4 margin-auto">
                            <div className="w3-container main-bg-color div-title">
                                <span className="w3-button w3-display-topright" onClick={(event) => {
                                    this.setState({ showRegister: false });
                                    this.regForm.current.reset();
                                }}>×</span>
                                <h2>Register As a</h2>
                            </div>
                            <div className="w3-container">
                                <form ref={this.regForm} onSubmit={this.submitHandler}>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Username</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input onChange={ (event) => {
                                                this.setState({ user : {...this.state.user, username: event.target.value }});
                                            }} value={this.state.username} className="w3-input w3-border" type="text" name="username" required />
                                        </div>
                                    </div>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Email</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input onChange={ (event) => {
                                                this.setState({ user : {...this.state.user, email: event.target.value }});
                                            }} value={this.state.email} className="w3-input w3-border" type="email" name="email" required />
                                        </div>
                                    </div>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Password</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input  onChange={ (event) => {
                                                this.setState({ user : {...this.state.user, password: event.target.value }});
                                            }} value={this.state.password} className="w3-input w3-border" type="password" name="password" required />
                                        </div>
                                    </div>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Re Enter Passowrd</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input onChange={ (event) => {
                                                this.setState({ confirmPassword : event.target.value });
                                            }} value={this.state.confirmPassword} className="w3-input w3-border" type="password" required />
                                        </div>
                                    </div>
                                    <p>
                                        <input onChange={(event) => {
                                            this.setState({ agree: event.target.checked});
                                        }} className="w3-check" type="checkbox" />
                                        <label style={{ fontSize: '12px', color: 'indigo' }}> I accept the <a style={{ color: 'blue' }} href="terms">Terms and Conditions</a>.</label></p>
                                    <p>
                                    </p><p className="clearfix">
                                        <button className="w3-btn main-bg-color div-title" style={{ float: 'right' }}>Submit</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Register End */}
                <Vison />
            </div>
        )
    }
}

export default Landing
