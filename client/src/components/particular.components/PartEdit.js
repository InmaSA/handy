import React, { Component } from 'react'

import { Link} from 'react-router-dom'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

import AuthServices from '../../services/auth.services'
import PartServices from '../../services/part.services'

class PartEdit extends Component {
  constructor(props){
    super(props);
    this.state = { 
      actualUsername: '',
      actualEmail: '',
      actualPhone: '',

      username: '', 
      email: '',
      phoneNumber: '',  
      }
    this.authServices = new AuthServices()
    this.partServices = new PartServices()
  }


  componentDidMount() {
    console.log(this.props.userInSession.data._id)
    this.partServices.getOneParticular(this.props.userInSession.data._id)
    .then(thePart => {

      this.setState(
      {
        actualUsername: thePart.data.username,
        actualEmail: thePart.data.email,
        actualPhone: thePart.data.phoneNumber
      }
    )})
  
    .catch((err) => console.log('err', err))
  }


  handleChangeInput = e => {

    let {name, value} = e.target
    
    this.setState({ [name]: value })
  }


  handleFormUpdate = e => {
    e.preventDefault()

    const id = this.props.userInSession.data._id
    const {username, email, phoneNumber} = this.state

    this.partServices.updateParticular(id, username, email, phoneNumber)
    .then((thePart) => {

      this.setState(
        {username:'', email: '', phoneNumber: '',
        actualUsername: thePart.data.username,
        actualEmail: thePart.data.email,
        actualPhone: thePart.data.phoneNumber
      })
    })
    .catch((err) => console.log('error al mandar tus datos actualizados a la base de datos', err.response.data.message))
  }


  deletePart = () => {

    const id = this.props.userInSession.data._id

    this.partServices.deleteParticular(id)
    .then(() => this.props.setUser(null))
    .catch(err => console.log(err))
  }


  render(){

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-5">

            <h3>Estos son tus datos:</h3>
            
            <Card bg="light" border="primary" style={{ width: '17rem' }}>
              <Card.Body>
                <Card.Title>{this.state.actualUsername}</Card.Title>
              </Card.Body>

              <ListGroup className="list-group-flush">
                <ListGroupItem>{this.state.actualEmail}</ListGroupItem>
                <ListGroupItem>{this.state.actualPhone}</ListGroupItem>
              </ListGroup>

            </Card>
          </div>
          
          <div className="col-md-5">

            <h3>Actualiza tus datos:</h3>

              <form onSubmit={this.handleFormUpdate}>
                  <label htmlFor="input-username">Nombre:</label>
                  <input type="text" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                  
                  <label htmlFor="input-email">Email:</label>
                  <input type="text" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                  
                  <label htmlFor="input-phone">Teléfono: </label>
                  <input type="text" name="phoneNumber" id="input-phone" value={this.state.phoneNumber} onChange={this.handleChangeInput}></input>  
                    
                  <button className="submit-btn" type="submit">Actualizar</button>
                  
                  <footer>
                    <Link as="div" to="#"><small onClick={this.deletePart}>Darse de baja</small></Link>
                  </footer>
              </form>
          </div>

        </div>
      </div>
    )
  }
}

export default PartEdit
