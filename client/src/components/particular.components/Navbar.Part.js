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

  logout = () => {
    this.authServices.logout()
    .then(x => {
      this.props.setUser(null)
        })
        .catch(err => console.log(err))
  }


  render() {
    return(

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">

            <Navbar.Brand href="/">
              <img 
                  src="../../../images/Handy-logo.png" 
                  width="20%"
                  alt="Handy logo">
              </img>
            </Navbar.Brand> 

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
              
                <Nav className="justify-content-end">
                    <Nav.Link><Link to="/particular/profile">Inicio</Link></Nav.Link>
                    <Nav.Link href="/favourites">Mis favoritos</Nav.Link>
                    <Nav.Link href="/edit-particular-profile">Mis datos</Nav.Link>
                    <Nav.Link href="/"onClick={this.logout}>Salir</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
  }
}  

export default NavBarPart