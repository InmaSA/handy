import React, {Component} from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import 'moment-timezone'

import EventsServices from '../services/events.services'

import Modal from 'react-bootstrap/Modal'

const jun = moment("2014-06-01T12:00:00Z")
const dec = moment("2014-12-01T12:00:00Z")

jun.tz('Europe/Madrid').format('ha z')
dec.tz('Europe/Madrid').format('ha z')


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


  onClickDay = (value) => {
    let valueOK = value.toUTCString().slice(0,16)
    this.setState({date: valueOK})
  }
  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()

    this.setState({
      professionalId: this.props.profId,
      particularName: this.props.part.username,
      particularPhone: this.props.part.phoneNumber,
      particularEmail: this.props.part.email,
      particularId: this.props.part._id
    }, ()=> {

      const {date, event, particularId, particularName, particularEmail, particularPhone, professionalId} = this.state
      console.log(date, event, particularId, particularName, particularEmail, particularPhone, professionalId)
      this.eventsServices.postEvents({date, event, particularId, particularName, particularEmail, particularPhone, professionalId})
      .then(() => {

        this.setState({      
          date: '',
          event: '',
          particularId: '',
          particularName: '',
          particularEmail: '',
          particularPhone: '',
          professionalId: '',
          showModal: false})
      })
      .catch((err) => console.log(err))
    })
  }

  onChange = () => {
    this.handleModalOpen()
  }
 

  render() {
    return (
      <>
        <Calendar onChange={(e)=>this.onChange(e)} onClickDay={(value) => this.onClickDay(value)}></Calendar>


        <Modal show={this.state.showModal} onHide={this.handleModalClose}>

            <Modal.Header closeButton>
                <Modal.Title>Describe brevemente qué necesitas:</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-event"></label>
                    <input type="textarea" name="event" id="input-event" value={this.state.event} onChange={this.handleChangeInput}></input>
                    <button type="submit" onClick={this.handleModalClose}>Enviar</button>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <p>Enviaremos una notificación por email con tus datos a este profesional para que contacte conigo en el menor plazo posible.</p>
            </Modal.Footer>

        </Modal>
      </>
    )
  }
}

export default CalendarComp