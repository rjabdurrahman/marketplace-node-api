import React, { Component } from 'react'
import './ProfileCard.css';

export class ProfileCard extends Component {
    render() {
        return (
            <div key={this.props.data} className="profile-card">
                <img src="./img/profile-img.jpg" alt="John" style={{ width: '100%' }} />
                <h1 style={{textTransform: 'uppercase'}}>{this.props.name}</h1>
                <p className="title">CEO &amp; Founder, Example</p>
                <p>Done : 45 Jobs</p>
                <p style={{ margin: 0, padding: 0 }}><button>Contact</button></p>
            </div>
        )
    }
}

export default ProfileCard
