import React, { Component } from 'react'
import axios from 'axios';
import './Post/Post.css'

class Invitations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            invits: [],
            userType: global.localStorage.getItem('user') ? JSON.parse(global.localStorage.getItem('user')).type : 0
        }
    }

    componentWillMount() {
        axios.get('http://localhost:5000/api/users/invitation', { headers: { auth: JSON.parse(global.localStorage.getItem('user')).token } })
            .then(res => this.setState({ invits: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        const invitations = this.state.invits.map(post => (
            <li key={post._id}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ margin: 0 }} className="title">{post.title}</h4>
                            <h6 style={{ margin: 0 }} className="author"><b>Estimated Budget:</b> {post.budget}</h6>
                            <h5 style={{ margin: 0, textDecoration: 'underline' }}>Description:</h5>
                        </div>
                    </div>
                    <p>{post.description}</p>
                    <p>Skills: {post.skills.map(x => (<span style={{ backgroundColor: 'gray', marginRight: '8px', color: 'white', padding: '6px 12px', borderRadius: '8px' }}>{x + ' '}</span>))}</p>
                    <p></p>
                </div>
            </li>
        ));
        return (
            <div className="w3-container" style={{ marginTop: 0, paddingTop: '80px', marginBottom: '20px' }}>
                {/* For Strtup To View their created post */}
                <div style={this.state.userType === 2 ? { display: 'block' } : { display: 'none' }} className="w3-border w3-card-2">
                    <ul className="w3-ul">
                        <li className=" w3-light-gray">
                            <h3>Invitations ({this.state.invits.length})</h3>
                        </li>
                    </ul>
                    <ul className="w3-ul post">
                        {invitations}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Invitations;