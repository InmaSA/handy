import axios from 'axios'

export default class PartServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

  getProfessionals = job =>  this.service.get(`search/${job}`)


// getProfessionals = (job) => {
//   Axios.get(`turutadeback/${job}`)
// }

  // getCoasters = () => this.service.get('getAllCoasters')
  // getOneCoaster = id => this.service.get(`getOneCoaster/${id}`)
  // postCoaster = theNewCoaster => this.service.post(`postCoaster`, theNewCoaster)
}  