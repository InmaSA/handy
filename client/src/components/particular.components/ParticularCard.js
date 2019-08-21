import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PartServices from '../../services/part.services'
import CalendarComp from '../CalendarComp'

import Modal from 'react-bootstrap/Modal'


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
        .then(response => { this.setState({ professionals: response.data })
        })
        .catch(err => console.log('err', err))
  }

  handleModalOpen = (e) => this.setState({ showModal: true, professionalId: e.target.value })
  handleModalClose = () => this.setState({ showModal: false, professionalId: '' })

  render() {
  
    return (
      <div className="container"> 

        <Link to="/particular/profile">Volver a tu perfil</Link>    
          <div className="row justify-content-around">
            {
              this.state.professionals.map(prof => {
                return(
                  
                <div className="col-md-5" key={prof._id}>
                    <h3>{prof.username}</h3>
                    <h4>{prof.job}</h4>
                    <p>{prof.description}</p>
                    <h4>{prof.localities}</h4>
                    <button value={prof._id} onClick={this.handleModalOpen}>Agendar una cita</button>
                </div>)
              })
            }

              <Modal show={this.state.showModal} onHide={this.handleModalClose}>

                  <Modal.Body>
                      <button onClick={this.handleModalClose}>Cerrar</button>
                      <CalendarComp profId={this.state.professionalId} part={this.props.user.data}closeModal={this.handleModalClose} ></CalendarComp>
                  </Modal.Body>

              </Modal>

          </div>
      </div>
    )
  }
}

export default ParticularCard
