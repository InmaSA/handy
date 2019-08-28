import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import AuthServices from '../../services/auth.services'

class PartHomePage extends Component {

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
      <div className="container part-home-page">
        <header>

        </header>
        <section className="row justify-content-around">

            <div className="col-md-4 section">
              <Link to="/search/hogar"><img src="../../../images/home.png" alt="home"></img></Link>
            </div>
            <div className="col-md-4 section">
              <Link to="/search/salud"><img src="../../../images/health.png" alt="salud y belleza"></img></Link>
            </div>

            <div className="col-md-4 section">
              <Link to="/search/eventos"><img src="../../../images/event.png" alt="eventos"></img></Link>
            </div>

            <div className="col-md-4 section">
              <Link to="/search/cultura"><img src="../../../images/theatre.png" alt="cultura y ocio"></img></Link>
            </div>
            
            
        </section>
      </div>
    )
  }

}

export default PartHomePage