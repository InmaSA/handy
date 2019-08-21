import React, {Component} from 'react'
import Calendar from 'react-calendar';

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
    // const {username, password} = this.state
    // this.authServices.loginPart(username, password)
    // .then(theLoggedUser => {
    //   this.setState({password: '', username: '' })
    //   this.props.setUser(theLoggedUser)
    //   this.props.history.push('/particular/profile')
    
    // })
    // .catch((err) => console.log('error al mandar la info de logeo al back', err.response.data.message))
  }




  onChange = () => {
    this.handleModalOpen()
  }
  // onChange = (value) => alert(value)

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