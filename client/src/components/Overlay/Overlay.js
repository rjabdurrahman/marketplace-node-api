import React, { Component } from 'react'
import Background from './bu-bg.jpg';
import './Overlay.css'

class Overlay extends Component {
    showReg() {
        console.log('ok');
    }
    render() {
        return (
            <div className="overlay-container" style={{ backgroundImage: `url(${Background})` }}>
                <div className="overlay">
                    <div className="w3-container home-unlog" style={{ marginTop: '110px' }}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Overlay;
