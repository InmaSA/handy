import axios from 'axios'

export default class EventsServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

 postEvents = theNewEvent => this.service.post(`postEvents`, theNewEvent)
 getProfEvents = profId => this.service.get(`getProfEvents/${profId}`) 

}