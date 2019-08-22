import axios from 'axios'

export default class PartServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

  getProfessionals = job =>  this.service.get(`search/${job}`)


}  