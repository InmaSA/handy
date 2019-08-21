import React, {Component} from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'

import AuthServices from './services/auth.services'
import ProtectedRoute from './components/routes/ProtectedRoute'

import Home from './components/Home'

import PartSignup from './components/particular.components/PartSignup'
import PartLogin from './components/particular.components/PartLogin'
import PartHomePage from './components/particular.components/PartHomePage'
import ParticularCard from './components/particular.components/ParticularCard'

import ProfSignup from './components/professional.components/ProfSignup'
import ProfLogin from './components/professional.components/ProfLogin'
import ProfHomePage from './components/professional.components/ProfHomePage'


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
            this.setTheUser(null)
        })
        .catch(err => console.log(err))
}

  render() {

    this.fetchUser()
    
    if (this.state.loggedInUser) {
      return (
        <>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/logout" component={Home}/> 
              <Route path='/search/:job' render={match => <ParticularCard {...match} user={this.state.loggedInUser} />} />
              <ProtectedRoute path='/particular/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={PartHomePage} />   
              <ProtectedRoute path='/professional/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={ProfHomePage} />   
            </Switch>
        </>
      )
      } else {
          return (
            <>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/logout" component={Home}/>  
                  <ProtectedRoute path='/particular/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={PartHomePage} />   
                  <ProtectedRoute path='/professional/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={ProfHomePage} />   
                  <Route exact path='/particular/login'  render={match => <PartLogin {...match}  setUser={this.setTheUser} />} />
                  <Route exact path='/particular/signup' render={match => <PartSignup {...match} setUser={this.setTheUser} />} /> 
                  <Route exact path='/professional/login'  render={match => <ProfLogin {...match}  setUser={this.setTheUser} />} />
                  <Route exact path='/professional/signup' render={match => <ProfSignup {...match} setUser={this.setTheUser} />} /> 
              </Switch>
            </>
          )
      }
  }
}


export default App;
