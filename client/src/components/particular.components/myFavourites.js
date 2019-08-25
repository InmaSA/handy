import React, { Component } from 'react'

import FCard from './FCard'

import PartServices from '../../services/part.services'

import Modal from 'react-bootstrap/Modal'
import CalendarComp from '../CalendarComp'


class MyFavourites extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      professionalsIds: [],
      showModal: false,
      professionalId: ''
      }
    this.partServices = new PartServices()
  }

  componentDidMount() {

        this.partServices.getMyFavourites(this.props.user.data._id)
        .then(response =>  {
          console.log(response.data.favourites)
          this.setState({ professionalsIds: response.data.favourites })
        })
        .catch(err => console.log('err', err))
  }

  handleModalOpen = (e) => this.setState({ showModal: true, professionalId: e.target.value })
  handleModalClose = () => this.setState({ showModal: false, professionalId: '' })

  render() {
    console.log(this.props.user.data)
    console.log(this.state.professionalsIds)
 
    if(this.state.professionalsIds !== []) {
      
      return (
        <>
        {
          this.state.professionalsIds.map((elm) => {
            return (
              <div className="container"> 
  
              <div className="row justify-content-around">
               
                <FCard key={elm} openModal={this.handleModalOpen} closeModal={this.handleModalClose} part={this.props.user.data} prof={elm}/>
    
    
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
          })
        }
        </>
      )
    } else {
      console.log('hey')
      return (
        <div className="container">

          <h2>Aún no has añadido profesionales a tus favoritos</h2>

        </div>
      )
    }
  }
}

export default MyFavourites
