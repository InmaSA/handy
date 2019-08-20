import React, { Component } from 'react';
import AuthServices from '../../services/auth.services';

class ProfLogin extends Component {
  constructor(props){
    super(props);
    this.state = { password: '', username: '' };
    this.authServices = new AuthServices();
  }

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    this.authServices.loginProf(username, password)
    .then(theLoggedUser => {
      this.setState({password: '', username: '' })
      this.props.setUser(theLoggedUser)
      this.props.history.push('/professional/profile')
    
    })
    .catch((err) => console.log('error al mandar la info de logeo al back', err.response.data.message))
  }


  render(){
    
    return(
      <div className="container">
      <h1>Hola de nuevo, entra en tu cuenta: </h1>
        <div className="row">
          
                <form className="col-md-6" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-username">Nombre de usuario: </label>
                    <input type="text" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                    <label htmlFor="input-password">Contraseña: </label>
                    <input type="password" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                    <button className="submit-btn" type="submit">Accede</button>
                </form>

   
        </div>
      </div>
    )
  }
}

export default ProfLogin;