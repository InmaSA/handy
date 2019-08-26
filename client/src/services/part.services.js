import axios from 'axios'

export default class PartServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

  getProfessionals = job =>  this.service.get(`search/${job}`)
  getLocalProfessionals = (job, localities) =>  this.service.get(`search/job/${job}/localities/${localities}`)
  getOneProfessional = id => this.service.get(`getOneProfessional/${id}`)

  updateFavourites = (partId, profId) =>  this.service.get(`update-favourites/part/${partId}/prof/${profId}`)
  removeFavourites = (partId, profId) =>   this.service.get(`remove-favourites/part/${partId}/prof/${profId}`)
  getMyFavourites = (partId)          =>   this.service.get(`my-favourites/${partId}`)

  
}  