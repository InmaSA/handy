import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Agenda from './Agenda'

import AuthServices from '../../services/auth.services'
import EventsServices from '../../services/events.services'

class ProfHomePage extends Component {

  constructor({props}){
    super(props)
    this.state = {
      showModal: false
    }
    this.authServices = new AuthServices()
    this.eventsServices = new EventsServices()

  }

  handleModalOpen = () =>  this.setState({ showModal: true})
  handleModalClose = () => this.setState({ showModal: false})


  logout = () => {
    this.authServices.logout()
    .then(x => {
      this.props.setUser(null)
        })
        .catch(err => console.log(err))
  }

  render = ()=> {

    return(
      <>
        <header>
            <h2>Home page de un profesional</h2>
            <nav>
                <ul>
                    <li><small>Bienvenid@, {this.props.loggedInUser.data.username}</small></li>
                    <li><Link to="#">Mis favoritos</Link></li>
                    <li><Link to="#">Editar perfil</Link></li>
                    <button onClick={this.handleModalOpen}>Mi agenda</button>
                    <button onClick={() => this.logout()}>logout</button>
                </ul>
            </nav>
        </header>

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>

            <Modal.Header>
                <Modal.Title>Mi agenda</Modal.Title>
            </Modal.Header>

            <Modal.Body>              
                <Agenda profId={this.props.loggedInUser.data._id}></Agenda>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleModalClose}>Cerrar</Button>
            </Modal.Footer>

        </Modal>
      </>
    )
  }

}

export default ProfHomePage