import React, {Component} from 'react'
import AuthServices from '../../services/auth.services'
import { Link } from 'react-router-dom'

class PartHomePage extends Component {

  constructor({props}){
    super(props)
    this.state = {}
    this.authServices = new AuthServices()

  }

  logout = () => {
    this.authServices.logout()
    .then(x => {
      // console.log(this)

      this.props.loggedInUser.setUser(null)
        })
        .catch(err => console.log(err))
  }

  render() {
    console.log(this)
    console.log(this.props.loggedInUser)
    return(
      <>
        <header>
            <h2>Home page de un particular</h2>
            <nav>
                <ul>
                    <li><Link to="#">Mis favoritos</Link></li>
                    <li><Link to="#">Mi calendario</Link></li>
                    <li><Link to="#">Editar perfil</Link></li>
                    <li><div onClick={this.logout}>Cerrar sesión</div></li>
                    <button onClick={this.logout}>logout</button>
                    {/* <li><small>Bienvenid@, {saludo}</small></li> */}
                </ul>
            </nav>
        </header>
      </>
    )
  }

}

export default PartHomePage