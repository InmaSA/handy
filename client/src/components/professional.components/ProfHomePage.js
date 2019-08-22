import React, {Component} from 'react'
import AuthServices from '../../services/auth.services'
import { Link } from 'react-router-dom'

class ProfHomePage extends Component {

  constructor({props}){
    super(props)
    this.state = {}
    this.authServices = new AuthServices()

  }

  logout = () => {
    this.authServices.logout()
    .then(x => {
      this.props.setUser(null)
        })
        .catch(err => console.log(err))
  }

  render() {

    return(
      <>
        <header>
            <h2>Home page de un profesional</h2>
            <nav>
                <ul>
                    <li><small>Bienvenid@, {this.props.loggedInUser.data.username}</small></li>
                    <li><Link to="#">Mis favoritos</Link></li>
                    <li><Link to="#">Editar perfil</Link></li>
                    <li><Link to="/agenda">Mi agenda</Link></li>
                    
                    <button onClick={() => this.logout()}>logout</button>
                    {/* <li><small>Bienvenid@, {saludo}</small></li> */}
                </ul>
            </nav>
        </header>
      </>
    )
  }

}

export default ProfHomePage