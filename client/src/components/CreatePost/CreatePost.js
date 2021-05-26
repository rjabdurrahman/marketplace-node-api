import React, { Component } from 'react'
import axios from 'axios';
import './CreatePost.css'
import Notification from '../Notification/Notification';

export class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                category: 'Project Managing',
                title: '',
                description: '',
                budget: '',
                deadline: '',
                skills: []
            }
        }
    }
    inputHandler = (event) => {
        if (event.target.name === 'skills') {
            this.state.post.skills = [];
            var skills = this.state.post[event.target.name].concat(event.target.value.replace(/,/g, ' ').split(' '));
            this.state.post.skills = skills;
        }
        else this.state.post[event.target.name] = event.target.value;
        this.setState({ post: this.state.post });
        // console.log(this.state);
    }
    submitHanler = (event) => {
        event.preventDefault();
        console.log('submitted');
        axios.post('http://localhost:5000/api/posts', this.state.post, { headers: { auth: JSON.parse(global.localStorage.getItem('user')).token } })
            .then(res => {
                if(res.status === 200){
                    Notification('Post Create Sucessfully!', 1);
                    this.setState({
                        post: {
                            category: 'Project Managing',
                            title: '',
                            description: '',
                            budget: '',
                            deadline: '',
                            skills: []
                        }
                    });
                }
                else {
                    Notification('Something Went Wrong!' + res.message, 2);
                }
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="w3-container" style={{ marginTop: 0, paddingTop: '20px', marginBottom: '20px' }}>
                <div className=" w3-border w3-card-2">
                    <ul className="w3-ul">
                        <li className=" w3-light-gray">
                            <h3>Create Post</h3>
                        </li>
                    </ul>
                    <div className="post" style={{ margin: '0 15px' }}>
                        <form onSubmit={this.submitHanler} style={{margin: '15px 0'}}>
                            <p>
                                <select className="w3-select w3-border" name="category" onChange={this.inputHandler}>
                                    <option value="Project Managing">Project Managing</option>
                                    <option value="Requirement Managing">Requirement Managing</option>
                                    <option value="Client Handling">Client Handling</option>
                                    <option value="CRM">CRM</option>
                                    <option value="SRM">SRM</option>
                                </select>
                            </p>
                            <p><label>Post Title</label>
                                <input className="w3-input w3-border" name="title" type="text" value={this.state.post.title} onChange={this.inputHandler} />
                            </p>
                            <p><label>Description</label>
                                <textarea className="w3-input w3-border" name="description" type="text" value={this.state.post.description} onChange={this.inputHandler}></textarea>
                            </p>
                            <p><label>Budget</label>
                                <input className="w3-input w3-border" name="budget" type="number" value={this.state.post.budget} onChange={this.inputHandler} />
                            </p>
                            <p><label>Deadline</label>
                                <input className="w3-input w3-border" name="deadline" type="date" value={this.state.post.deadline} onChange={this.inputHandler} />
                            </p>
                            <p><label>Skills</label>
                                <input className="w3-input w3-border" name="skills" type="text" value={this.state.post.skills} onChange={this.inputHandler} />
                            </p>
                            <p><button className="w3-btn main-bg-color">Submit</button></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePost
