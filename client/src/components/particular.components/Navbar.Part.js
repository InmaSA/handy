import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthServices from '../../services/auth.services'

import { Navbar, Nav } from 'react-bootstrap'

class NavBarPart extends Component {

  constructor(props) {
      super(props)
      this.state = {
        navExpanded: false
      }
      this.authServices = new AuthServices()
  }

  setNavExpanded = (expanded) => this.setState({ navExpanded: expanded })

  closeNav= () => this.setState({ navExpanded: false })


  logout = () => {
    this.authServices.logout()
    .then(x => {
      this.props.setUser(null)
        })
        .catch(err => console.log(err))
  }


  render() {
    return(

        <Navbar bg="light" variant="light"
                onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded}>

            <Navbar.Toggle/>

            <Navbar.Collapse>
                <Nav className="mr-auto" onSelect={this.closeNav}>
                    <Nav.Link as="div"><Link to="/"><img 
                        src="../../../images/Handy-icon.png" 
                        width="5%"
                        border-radius="10px"
                        alt="icono de Handy">
                    </img></Link></Nav.Link>

                    <Nav.Link as="div"><small>Bienvenid@, {this.props.userInSession.data.username}</small></Nav.Link>
                    <Nav.Link as="div"><Link to="#">Mis favoritos</Link></Nav.Link>
                    <Nav.Link as="div"><Link to="#">Editar perfil</Link></Nav.Link>
                    <Nav.Link as="div" onClick={this.logout}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
  }
}  

export default NavBarPart