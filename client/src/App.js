import React, {Component} from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'

import AuthServices from './services/auth.services'
import ProtectedRoute from './components/routes/ProtectedRoute'

import Home from './components/Home'
import PartSignup from './components/particular.components/PartSignup'
import PartLogin from './components/particular.components/PartLogin'
import PartHomePage from './components/particular.components/PartHomePage'


class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.authServices = new AuthServices()

  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("Un componente ha cambiado el usuario en App:", this.state.loggedInUser)
  }


  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authServices.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  logout = () => {
    this.authServices.logout()
        .then(x => {
            this.props.setUser(null)
        })
        .catch(err => console.log(err))
}

  render() {

    this.fetchUser()
    
    if (this.state.loggedInUser) {
    return (
      <>
        <Switch>
           <ProtectedRoute path='/particular/profile' user={this.state.loggedInUser} component={PartHomePage} />   
           <Route path="/" exact component={Home} /> 
                 
           {/* <Route exact path="/particular/confirm/:confirmationCode" render={() => <Home/>}/> */}
        </Switch>
        <button onClick={this.logout}>logout</button>
      </>
      )
      } else {
        return (
          <>
            <Switch>
                <Route path="/" exact component={Home} /> 
                <ProtectedRoute path='/particular/profile' user={this.state.loggedInUser} component={PartHomePage} />   
                <Route exact path='/particular/login'  render={match => <PartLogin {...match}  setUser={this.setTheUser} />} />
                <Route exact path='/particular/signup' render={match => <PartSignup {...match} setUser={this.setTheUser} />} /> 
            </Switch>
          </>
        )
      }
  }
}


export default App;
