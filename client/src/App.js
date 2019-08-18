import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Signup from './components/particular.components/Signup'


function App() {
  return (
  <>
    <Switch>
       <Route path="/" exact component={Home} /> 
       <Route exact path='/particular/signup' render={() => <Signup/>}/> 
    </Switch>
  </>
  );
}

export default App;
