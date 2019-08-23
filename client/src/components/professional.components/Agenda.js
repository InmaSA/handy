import React, {Component} from 'react'

import EventsServices from '../../services/events.services'

class Agenda extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: []
    }
    this.eventsServices = new EventsServices()
    
  }
  

  componentDidMount() {
    this.eventsServices.getProfEvents(this.props.profId)
    .then(response => {
      this.setState({ events: response.data })
    })
    .catch(err => console.log(err))
  }


  render() {
  
    return (
      <>
      {
        this.state.events.map(elm => {
          return (
            <div key={elm._id}>
            <h5>{elm.date}</h5>
            <p>{elm.particularName}</p>   
            <p>{elm.particularPhone}</p>
            <p>{elm.event}</p>
            <hr></hr>
          </div> 
          )
        })
      }
      </>
    )
  }

}
export default Agenda