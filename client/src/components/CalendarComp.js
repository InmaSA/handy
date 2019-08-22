import React, {Component} from 'react'
import Calendar from 'react-calendar';

import EventsServices from '../services/events.services'

import Modal from 'react-bootstrap/Modal'


class CalendarComp extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: '',
      event: '',
      particularId: '',
      particularName: '',
      particularEmail: '',
      particularPhone: '',
      professionalId: '',
      showModal: false
    }
    this.eventsServices = new EventsServices()
  }

  handleModalOpen = () => this.setState({ showModal: true })
  handleModalClose = () => this.setState({ showModal: false })


  onClickDay = (value) => this.setState({date: value})
  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()
    console.log()
    this.setState({
      professionalId: this.props.profId,
      particularName: this.props.part.username,
      particularPhone: this.props.part.phoneNumber,
      particularEmail: this.props.part.email,
      particularId: this.props.part._id
    })
    const {date, event, particularId, particularName, particularEmail, particularPhone, professionalId} = this.state
    this.eventsServices.postEvents({date, event, particularId, particularName, particularEmail, particularPhone, professionalId})
    .then(() => this.setState({      
        date: '',
        event: '',
        particularId: '',
        particularName: '',
        particularEmail: '',
        particularPhone: '',
        professionalId: '',
        showModal: false}))
    .catch((err) => console.log(err))
  }

  onChange = () => {
    this.handleModalOpen()
  }
 

  render() {
    return (
      <>
        <Calendar onChange={(e)=>this.onChange(e)} onClickDay={(value) => this.onClickDay(value)}></Calendar>


        <Modal show={this.state.showModal} onHide={this.handleModalClose}>

            <Modal.Body>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-event"></label>
                    <input type="text" name="event" id="input-event" value={this.state.event} onChange={this.handleChangeInput}></input>
                    <button type="submit" onClick={this.handleModalClose}>Crear cita</button>
                </form>
            </Modal.Body>

        </Modal>
      </>
    )
  }
}

export default CalendarComp