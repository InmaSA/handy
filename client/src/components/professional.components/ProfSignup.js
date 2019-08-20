import React, { Component } from 'react'
import AuthServices from '../../services/auth.services'

class ProfSignup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', job: '', description: '', localities: '', spain: '' }
    this.authServices = new AuthServices()
  }

  handleChangeInput = e => {

    let {name, value} = e.target

    if (name === 'spain') {
      value = e.target.checked
    }
    this.setState({ [name]: value })
  }


  handleFormSubmit = e => {
    e.preventDefault()
    const {username, email, password, job, description, localities, spain} = this.state
    this.authServices.signupProf(username, email, password, job, description, localities, spain)
    .then((theNewUser) => {
      this.setState({username:'', password: '', email: '', job: '', description: '', localities: '', spain: '' })
      this.props.setUser(theNewUser)
      this.props.history.push('/professional/profile')
    
    })
    .catch((err) => console.log('error al mandar la info de registro al back', err))
  }


  render(){
    return(
      <div className="container">
      <h1>Regístrate:</h1>
        <div className="row">
          
                <form className="col-md-6" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-username">Nombre:</label>
                    <input type="text" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                    
                    <label htmlFor="input-email">Email:</label>
                    <input type="text" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                    
                    <label htmlFor="input-job">¿Qué trabajo realizas?:</label>
                    <input type="text" name="job" id="input-job" value={this.state.job} onChange={this.handleChangeInput}></input>
                    
                    <label htmlFor="input-description">Describe tu trabajo brevemente: </label>
                    <input type="textaera" name="description" id="input-description" value={this.state.description} onChange={this.handleChangeInput}></input>

                    <label htmlFor="input-localities">Provincias:</label>
                    <input type="text" name="localities" id="input-localities" value={this.state.localities} onChange={this.handleChangeInput}></input>
                    
                    <p>¿Trabajarías en toda la península?:</p>
                    <label htmlFor="spain-yes">
                      <input type="checkbox" name="spain" id="spain-yes" checked={this.state.spain} onChange={this.handleChangeInput} ></input>
                      Si, sin problema
                    </label>
                     
                    <label htmlFor="input-password">Contraseña:</label>
                    <input type="password" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                    
                    <button className="submit-btn" type="submit">Enviar</button>
                </form>

   
        </div>
      </div>
    )
  }
}

export default ProfSignup;

