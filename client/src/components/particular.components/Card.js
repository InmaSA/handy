import React, {Component} from 'react'

import Star from './Star'

class Card extends Component  {
  constructor (props) {
    super(props)

  }


  render() {
    return(
      <>
        { 
          this.props.professionals.map(prof => {  
            return (

                <div className="col-md-5" key={prof._id}>

                  <div className="row">

                      <div className="col-sm-4">
                          <img width="100%" src={prof.imageUrl} alt={prof.username}></img>
                          <Star prof={prof._id} part={this.props.part}></Star>
                      </div>

                      <div className="col-sm-6">
                          <h5>Mi nombre es {prof.username}</h5>
                          <h5>Mi dedico a {prof.job}</h5>
                          <p>'{prof.description}'</p>
                          <h5>Trabajo en la provincia de {prof.localities}</h5>
                          <button value={prof._id} onClick={this.props.openModal}>Solicita presupuesto</button>
                      </div>
                  </div>

                </div>
            )
          })
        }
      </>
    )  
  }


}

export default Card