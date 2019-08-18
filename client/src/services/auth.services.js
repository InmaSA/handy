import axios from 'axios'

export default class AuthServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

    signupPart = (username, email, password) => {
      return this.service.post('/particular/signup', {username, email, password})
      .then(response => response.data)
    }

    loginPart = (email, password) => {
      return this.service.post('/particular/login', {email, password})
      .then(response => response.data)
    }



    loggedin = () => {
      return this.service.get('/loggedin')
      .then(response => response.data)
    }

    logout = () => {
      return this.service.post('/logout', {})
      .then(response => response.data)
    }

}