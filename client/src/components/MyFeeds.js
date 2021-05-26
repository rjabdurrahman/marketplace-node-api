import React, { Component } from 'react'
import axios from 'axios';
import './Post/Post.css'

class myFeeds extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proposal: [],
            showPorposal: false,
            myFeeds: [],
            author: '',
            postId: '',
            userType: global.localStorage.getItem('user') ? JSON.parse(global.localStorage.getItem('user')).type : 0
        }
        console.log(this.state.userType);
    }

    componentWillMount() {
        axios.get('http://localhost:5000/api/posts/myfeed', { headers: { auth: JSON.parse(global.localStorage.getItem('user')).token } })
            .then(res => this.setState({ myFeeds: res.data }))
            .catch(err => console.log(err));
    }

    sendInvite = function () {
        axios.post('http://localhost:5000/api/users/invitation', { username: this.state.author, post: this.state.postId }, { headers: { auth: JSON.parse(global.localStorage.getItem('user')).token } })
            .then(res => console.log('Invited'))
            .catch(err => console.log(err));
    }
    render() {
        const myFeeds = this.state.myFeeds.map(post => (
            <li key={post._id}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ margin: 0 }} className="title">{post.title}</h4>
                            <h6 style={{ margin: 0 }} className="author"><b>Estimated Budget:</b> {post.budget}</h6>
                            <h5 style={{ margin: 0, textDecoration: 'underline' }}>Description:</h5>
                        </div>
                        <div>
                            <button className="w3-btn w3-indigo w3-round-medium" style={{ marginTop: '20px', marginRight: '30px' }} onClick={() => { this.setState({ showPorposal: true, proposal: post.proposals, postId: post._id }) }}>View Propsals: <span className="w3-badge w3-white">{post.proposals.length}</span></button>
                        </div>
                    </div>
                    <p>{post.description}</p>
                    <p>Skills: {post.skills.map(x => (<span style={{ backgroundColor: 'gray', marginRight: '8px', color: 'white', padding: '6px 12px', borderRadius: '8px' }}>{x + ' '}</span>))}</p>
                    <p></p>
                </div>
            </li>
        ));
        const proposals = this.state.proposal.map(pro => (
            <li className="w3-hover-pale-green">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6><span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>User:</span> {pro.author}</h6>
                    <h6><span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Bidded:</span> {pro.amount}</h6>
                </div>
                <div>
                    <h6><span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Cover Letter:</span></h6>
                    <p>{pro.message}</p>
                    <p>
                        <button className="w3-btn w3-indigo w3-round-medium" style={{ marginTop: '20px', marginRight: '30px' }} onClick={() => { this.setState({ author: pro.author }); this.sendInvite() }}>Send Invitation</button>
                    </p>
                </div>
            </li>
        ));
        return (
            <div className="w3-container" style={{ marginTop: 0, paddingTop: '80px', marginBottom: '20px' }}>
                {/* For Strtup To View their created post */}
                <div style={this.state.userType === 1 ? { display: 'block' } : { display: 'none' }} className="w3-border w3-card-2">
                    <ul className="w3-ul">
                        <li className=" w3-light-gray">
                            <h3>{this.props.title ? this.props.title : 'My Created Feeds'}</h3>
                        </li>
                    </ul>
                    <ul className="w3-ul post">
                        {myFeeds}
                    </ul>
                </div>
                {/* Proposal Area */}
                <div style={this.state.showPorposal ? { display: 'block' } : { display: 'none' }} className="w3-modal">
                    <div className="w3-modal-content w3-animate-zoom div-box" style={{ backgroundColor: 'transparent' }}>
                        <div className="w3-light-gray w3-card-4 margin-auto">
                            <div className="w3-container main-bg-color div-title">
                                <span onClick={() => this.setState({ showPorposal: false })} className="w3-button w3-display-topright">×</span>
                                <h2>Proposals</h2>
                            </div>
                            <div className="w3-container">
                                <ul className="w3-ul">
                                    {proposals}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Proposal Area End */}
            </div>
        )
    }
}

export default myFeeds