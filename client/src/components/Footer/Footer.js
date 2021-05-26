import React, { Component } from 'react'
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="main-bg-color robo-font flex" style={{ height: '75px', justifyContent: 'space-between' }}>
                <div>
                    <h2>Developed By</h2>
                    <p><a href="http://linkedlin.com">Md Mahabubur Rahman</a> and <a href="http://linkedin.com">Raihan Akter</a></p>
                </div>
                <div>
                    <h2 style={{ margin: '0' }} className="pac-font">TenStartup</h2>
                </div>
            </footer>
        )
    }
}

export default Footer
