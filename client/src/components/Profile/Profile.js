import React, { Component } from 'react'
import axios from 'axios'
import Notification from '../Notification/Notification';
import './Profile.css'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            title: '',
            description: '',
            social: [
                {
                    linkedIn: ''
                }
            ]
        }
    }
    componentWillMount() {
        axios.get('http://localhost:5000/api/profile', { headers: { auth: JSON.parse(global.localStorage.getItem('user')).token } })
            .then(res => {
                delete res.data._id;
                delete res.data.__v;
                this.setState(res.data)
            })
            .catch(err => console.log(err));
    }

    submitHanler = (event) => {
        event.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:5000/api/profile', this.state, { headers: { auth: JSON.parse(global.localStorage.getItem('user')).token } })
            .then(res => {
                console.log(res.data);
                Notification('Updated Successfully!', 1);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <form onSubmit={this.submitHanler} className="profile-area">
                <div className="flex">
                    <div className="profile-pic">
                        <img src="https://profiles.utdallas.edu/img/default.png" alt="IMG" />
                    </div>
                    <div className="profile-text">
                        <input className="w3-input w3-border" onChange={(event) => this.setState({ ...this.state, name: event.target.value })} name="name" defaultValue={this.state.name} type="text" placeholder="Name" />
                        <input className="w3-input w3-border" onChange={(event) => this.setState({ ...this.state, title: event.target.value })} name="title" defaultValue={this.state.title} type="text" placeholder="Professional Title" />
                    </div>
                </div>
                <div className="info">
                    <div style={{ margin: '15px 0' }}>
                        <p><label>About You</label>
                            <textarea className="w3-input w3-border" onChange={(event) => this.setState({ ...this.state, description: event.target.value })} name="description" defaultValue={this.state.description} type="text" ></textarea>
                        </p>
                        <p><label>Skills</label>
                            <input className="w3-input w3-border" onChange={(event) => this.setState({ ...this.state, skills: event.target.value })} name="skills" defaultValue={this.state.skills} type="text" />
                        </p>
                        <p><label>LinkedIn Profile</label>
                            <input className="w3-input w3-border" onChange={(event) => this.setState({ ...this.state, social: { linkedIn: event.target.value } })} name="social" defaultValue={this.state.social.linkedIn} type="text" />
                        </p>
                        <p><button type="submit" className="w3-btn main-bg-color">Update</button></p>
                    </div>
                </div>
            </form>
        )
    }
}

export default Profile