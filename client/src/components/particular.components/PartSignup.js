import React, { Component } from 'react'
import AuthServices from '../../services/auth.services'

class PartSignup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', phoneNumber: '' }
    this.authServices = new AuthServices()
  }

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, email, phoneNumber, password} = this.state
    this.authServices.signupPart(username, email, phoneNumber, password)
    .then((theNewUser) => {
      this.setState({username:'', password: '', email: '', phoneNumber: '' })
      this.props.setUser(theNewUser)
      this.props.history.push('/particular/profile')
    
    })
    .catch((err) => console.log('error al mandar la info de registro al back', err))
  }


  render(){
    return(
      <div className="container">
      <h1>Regístrate:</h1>
        <div className="row">
          
                <form className="col-md-6" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-username">Nombre: </label>
                    <input type="text" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                    <label htmlFor="input-email">Email: </label>
                    <input type="text" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                    <label htmlFor="input-phone">Teléfono: </label>
                    <input type="text" name="phoneNumber" id="input-phone" value={this.state.phoneNumber} onChange={this.handleChangeInput}></input>  
                    <label htmlFor="input-password">Contraseña: </label>
                    <input type="password" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                    <button className="submit-btn" type="submit">Enviar</button>
                </form>

   
        </div>
      </div>
    )
  }
}

export default PartSignup;

