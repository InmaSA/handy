import axios from 'axios'

export default class AuthServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

    signupPart = (username, email,phoneNumber, password) => this.service.post('particular/signup', {username, email, phoneNumber, password})
    loginPart = (username, password) => this.service.post('particular/login', {username, password})
  
    signupProf = (username, email, password, job, description, localities, spain) => this.service.post('professional/signup', {username, email, password, job, description, localities, spain})
    loginProf = (username, password) => this.service.post('professional/login', {username, password})
 

    // confirmCodePart = (confirmationCode) => {
    //   return this.service.post('/particular/confirm/:confirmationCode', {confirmationCode})
    //   .then(response => response.data)
    // }


    logout = () => this.service.post('logout')
    loggedin = () => this.service.get('loggedin')

}