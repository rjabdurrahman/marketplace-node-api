import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './w3.css';
import { Route, BrowserRouter } from "react-router-dom";
import TopNav from './components/TopNav/TopNav';
import Landing from './components/Landing/Landing';
import Post from './components/Post/Post';
import CreatePost from './components/CreatePost/CreatePost';
import myFeeds from './components/MyFeeds';
import Invitations from './components/Invitations';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <BrowserRouter>
          <div>
            <Route path='/' exact component={Landing} />
            <Route path='/posts' exact component={Post} />
            <Route path='/create-post' exact component={CreatePost} />
            <Route path='/my-feeds' exact component={myFeeds} />
            <Route path='/invs' exact component={Invitations} />
            <Route path='/profile' exact component={Profile} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
