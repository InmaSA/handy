import React, { Component } from 'react'

import PartServices from '../../services/part.services'
import CalendarComp from '../CalendarComp'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class MyFavourites extends Component {
  
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
        .then(response => { this.setState({ professionals: response.data })
        })
        .catch(err => console.log('err', err))
  }

  handleModalOpen = (e) => this.setState({ showModal: true, professionalId: e.target.value })
  handleModalClose = () => this.setState({ showModal: false, professionalId: '' })

  render() {
  
    return (
      <div className="container"> 

          <div className="row justify-content-around">
            {
              this.state.professionals.map(prof => {
                return(
                  
                <div className="col-md-5" key={prof._id}>
                    <div class="row">
                        <div className="col-sm-4">
                            <img width="100%" src={prof.imageUrl} alt={prof.username}></img>
                        </div>
                            <div className="col-sm-6">
                            <h5>Mi nombre es {prof.username}</h5>
                            <h5>Mi dedico a {prof.job}</h5>
                            <p>'{prof.description}'</p>
                            <h5>Trabajo en la provincia de {prof.localities}</h5>
                            <button value={prof._id} onClick={this.handleModalOpen}>Agendar una cita</button>
                        </div>
                    </div>

                </div>)
              })
            }

              <Modal show={this.state.showModal} onHide={this.handleModalClose}>

                  <Modal.Header closeButton>
                      <Modal.Title>Selecciona un día</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                      <CalendarComp profId={this.state.professionalId} part={this.props.user.data}closeModal={this.handleModalClose} ></CalendarComp>
                  </Modal.Body>

                  <Modal.Footer>
                      <Button onClick={this.handleModalClose}>Cerrar</Button>
                  </Modal.Footer>

              </Modal>

          </div>
      </div>
    )
  }
}

export default MyFavourites
