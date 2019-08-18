import React, { Component } from 'react';
import AuthServices from '../../services/auth.services';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', status: '', confirmationCode: '' };
    this.service = new AuthServices();
  }

  // handleChange() and handleSubmit() will be added here

  render(){
    return(
      <>
      <h1>Sign up</h1>
      </>
    )
  }
}

export default Signup;

