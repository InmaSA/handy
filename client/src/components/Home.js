  
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

  constructor (){
    super()
    this.state = {}
  }

  render () {
    return (
      <>
        <header className="container hero">
          <div className="row">
              <div className="col-md-4">
                  <img className="home-big-logo" src="../../images/Handy-logo.png" alt="Handy logo"></img>  
              </div>
              <div className="col-md-6">
                  <h1>Conectando personas para la solución de problemas</h1>
              </div>
          </div>
        </header>


        <div className="container">     

          <div className="row home-row">
            <div className="col-md-5 home-cards">
              <h2>Si eres un particular, encuentra al profesional que buscas para el trabajo que necesitas</h2>

              <Link className="button" to="/particular/login">Accede a tu cuenta</Link>
              <p>¿Aún no eres usuario?</p>

              <Link className="button" to="/particular/signup">Sign up</Link>

            </div>


            <div className="col-md-5 home-cards">

                <h2>Si eres un profesional, este es tu sitio:</h2>

                <Link className="button" to="/professional/login">Accede a tu cuenta</Link>
                <p>¿Aún no eres usuario?</p>

                <Link className="button" to="/professional/signup">Sign up</Link>

            </div>
          </div>

        </div>
      </>  
    )
  }
}

export default Home