import axios from 'axios'

export default class AuthServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

    signupPart = (username, email, password) => this.service.post('particular/signup', {username, email, password})
    loginPart = (username, password) => this.service.post('particular/login', {username, password})
  

    // confirmCodePart = (confirmationCode) => {
    //   return this.service.post('/particular/confirm/:confirmationCode', {confirmationCode})
    //   .then(response => response.data)
    // }


    logout = () => this.service.post('logout')
    loggedin = () => this.service.get('loggedin')

}