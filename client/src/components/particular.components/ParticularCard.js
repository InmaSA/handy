import React, { Component } from 'react'

import Card from './Card'

import Modal from 'react-bootstrap/Modal'

import PartServices from '../../services/part.services'
import CalendarComp from '../CalendarComp'



class ParticularCard extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      professionals: [],
      showModal: false,
      professionalId: ''
      }
    this.partServices = new PartServices()
  }

  componentDidMount() {
    this.partServices.getProfessionals(this.props.match.params.job)
        .then(response => this.setState({ professionals: response.data }))
        .catch(err => console.log('err', err))
        
  }

  handleModalOpen = (e) => this.setState({ showModal: true, professionalId: e.target.value })
  handleModalClose = () => this.setState({ showModal: false, professionalId: '' })

  render() {
  
    return (
      <div className="container"> 

          <div className="row justify-content-around">
           
            <Card openModal={this.handleModalOpen} closeModal={this.handleModalClose} professionals={this.state.professionals} part={this.props.user.data}/>


            <Modal show={this.state.showModal} onHide={this.handleModalClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Selecciona un día:</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CalendarComp profId={this.state.professionalId} part={this.props.user.data} closeModal={this.handleModalClose} ></CalendarComp>
                </Modal.Body>

                <Modal.Footer>
                    <p>Dinos por favor la fecha aproximada de comienzo del trabajo.</p>
                </Modal.Footer>

            </Modal>

          </div>
      </div>
    )
  }
}

export default ParticularCard
