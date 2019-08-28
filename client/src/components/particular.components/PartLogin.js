import React, { Component } from 'react';
import AuthServices from '../../services/auth.services';

import { Link } from 'react-router-dom'

class PartLogin extends Component {
  constructor(props){
    super(props);
    this.state = { password: '', username: '' };
    this.authServices = new AuthServices();
  }

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    this.authServices.loginPart(username, password)
    .then(theLoggedUser => {
      this.setState({password: '', username: '' })
      this.props.setUser(theLoggedUser)
      this.props.history.push('/particular/profile')
    
    })
    .catch((err) => console.log('error al mandar la info de logeo al back', err.response.data.message))
  }


  render(){
    
    return(
    <div className="background-repeat">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6 login-form">
            <Link to="/"><img src="/images/Handy-icon.png" alt="handy icon"></img></Link>  
            <h3>Hola de nuevo, entra en tu cuenta: </h3>
              <div className="row justify-content-center">
            
                  <form className="col-md-10" onSubmit={this.handleFormSubmit}>

                      <div className="form-group">
                          <label htmlFor="input-username">Nombre de usuario: </label>
                          <input type="text" className="form-control" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                      </div>

                      <div className="form-group">
                          <label htmlFor="input-password">Contraseña: </label>
                          <input type="password" className="form-control" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                      </div>
                      
                      <button className="btn btn-light" type="submit">Accede</button>
                  </form>
        
              </div>

          </div>
        </div>
      </div>
    </div>  
    )
  }
}

export default PartLogin;