import React, { Component } from 'react'
import './Vison.css'

class Vison extends Component {
  render() {
    return (
      <div className="w3-container w3-light-gray vision-container flex">
        <div>
          <img src="img/icon-4.svg" alt="Norway" />
          <div className="mont-font fet">Connect Experienened</div>
        </div>
        <div>
          <img src="img/icon-51.svg" alt="Norway"/>
          <div className="mont-font fet">Discuss Problem</div>
        </div>
        <div>
          <img src="img/icon-62.svg" alt="Norway" />
          <div className="mont-font fet">Ace Your Term</div>
        </div>
      </div>
    )
  }
}

export default Vison
