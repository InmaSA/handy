import axios from 'axios'

export default class ProfServices {
  constructor() {

      this.service = axios.create({
        baseURL: 'http://localhost:5000/api/',
        withCredentials: true
      })
  }

  getOneProfessional = id => this.service.get(`getOneProfessional/${id}`)

  
  updateProfessional = (id, username, email, job, description, localities, imageUrl) => {
    return this.service.post(`edit-professional-profile/${id}`, {username, email, job, description, localities, imageUrl})
  }  

  deleteProfessional = id => this.service.get(`deleteProfessional/${id}`)
  
  rateProfessional = (id,value) => {
  return   this.service.post(`rateProfessional/id/${id}/value/${value}`)
  }
  
}  