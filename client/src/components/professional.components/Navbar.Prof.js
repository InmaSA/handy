import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthServices from '../../services/auth.services'

import { Navbar, Nav } from 'react-bootstrap'


class NavBarPart extends Component {

  constructor(props) {
      super(props)
      this.state = {
        navExpanded: false,
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
    console.log(this.props.match)
    return(
      <>
        <Navbar bg="light" variant="light"
                onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded}>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse>
                <Nav className="mr-auto" onSelect={this.closeNav}>
                    <Nav.Link as="div"><Link to="/"><img 
                        src="../../../images/Handy-icon.png" 
                        width="5%"
                        border-radius="25%"
                        alt="icono de Handy">
                    </img></Link></Nav.Link>
                   
                    <Nav.Link as="div"><Link to="/professional/profile">Volver a tu perfil</Link></Nav.Link>   
                    <Nav.Link as="div"><Link to="#">Editar mis datos</Link></Nav.Link>
                    <Nav.Link as="div" to="/" onClick={this.logout}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}  

export default NavBarPart