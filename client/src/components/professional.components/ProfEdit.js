import React, { Component } from 'react'

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

import AuthServices from '../../services/auth.services'
import ProfServices from '../../services/prof.services'

class ProfEdit extends Component {
  constructor(props){
    super(props);
    this.state = { 
      actualUsername: '',
      actualEmail: '',
      actualJob: '',
      actualDescription: '',
      actualLocalities: '',
      actualImageUrl: '',

      username: '', 
      email: '', job: '', 
      description: '', 
      localities: '', 
      imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png' }
    this.authServices = new AuthServices()
    this.profServices = new ProfServices()
  }


  componentDidMount() {
    this.profServices.getOneProfessional(this.props.userInSession.data._id)
    .then(theProf => {

      this.setState(
      {
        actualUsername: theProf.data.username,
        actualEmail: theProf.data.email,
        actualJob: theProf.data.job,
        actualDescription: theProf.data.description,
        actualLocalities: theProf.data.localities,
        actualImageUrl: theProf.data.imageUrl
      }
    )})
  
    .catch((err) => console.log('err', err))
  }


  handleChangeInput = e => {

    let {name, value} = e.target
    
    this.setState({ [name]: value })
  }


  handleFormUpdate = e => {
    e.preventDefault()

    const id = this.props.userInSession.data._id

    const {username, email, job, description, localities, imageUrl} = this.state


    this.profServices.updateProfessional(id, username, email, job, description, localities, imageUrl)
    .then(() => {

      this.setState({username:'', email: '', job: '', description: '', localities: '', imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png' })
      // this.props.setUser(theUser)
      // this.props.history.push('/professional/profile')
    
    })
    .catch((err) => console.log('error al mandar tus datos actualizados a la base de datos', {err}))
  }


  handleFileUpload = e => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.authServices.handleUpload(uploadData)
        .then(response => {
          this.setState({ imageUrl: response.data.secure_url })
        })
        .catch(err => console.log(err))
  }


  deleteProf() {

    const id = this.props.userInSession.data._id

    this.profServices.deleteProfessional(id)
    .then(() => {
      console.log('allá voy')
      this.props.history.push('/')
    })
    .catch(err => console.log(err))
  }


  render(){

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-5">

            <h3>Estos son tus datos:</h3>
            
            <Card bg="light" border="primary" style={{ width: '17rem' }}>
              <Card.Img width="20%" variant="top" src={this.state.actualImageUrl} />
              <Card.Body>
                <Card.Title>{this.state.actualUsername}</Card.Title>
                <hr></hr>
                <Card.Text>
                  {this.state.actualDescription}
                </Card.Text>
              </Card.Body>

              <ListGroup className="list-group-flush">
                <ListGroupItem>{this.state.actualEmail}</ListGroupItem>
                <ListGroupItem>{this.state.actualJob}</ListGroupItem>
                <ListGroupItem>{this.state.actualLocalities}</ListGroupItem>
              </ListGroup>

            </Card>
          </div>
          
          <div className="col-md-5">

            <h3>Actualiza tus datos:</h3>

              <form onSubmit={this.handleFormUpdate}>
                  <label htmlFor="input-username">Nombre:</label>
                  <input type="text" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                  
                  <label htmlFor="input-email">Email:</label>
                  <input type="text" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                  
                  <p>¿Qué trabajo realizas?:</p>
                  <select name="job" id="input-job" selected={this.state.job} onChange={this.handleChangeInput} >
                      <option>selecciona</option>
                      <option value='albañilería'>albañilería</option>
                      <option value='animador sociocultural'>animador sociocultural</option>
                      <option value='catering'>catering</option>
                      <option value='clases particulares'>clases particulares</option>
                      <option value='costura'>costura</option>
                      <option value='cuidado de mascotas'>cuidado de mascotas</option>
                      <option value='cuidado de personas'>cuidado de personas</option>
                      <option value='electricidad'>electricidad</option>
                      <option value='fisioterapia'>fisioterapia</option>
                      <option value='fontanería'>fontanería</option>
                      <option value='guía turístico'>guía turístico</option>
                      <option value='informática'>informática</option>
                      <option value='jardinería'>jardinería</option>
                      <option value='limpieza del hogar'>limpieza del hogar</option>
                      <option value='maquillaje profesional'>maquillaje profesional</option>
                      <option value='música y espectáculos'>música y espectáculos</option>
                      <option value='peluquería y estética'>peluquería y estética</option>
                      <option value='personal shopper'>personal shopper</option>
                      <option value='pintura'>pintura</option>
                      <option value='reformas'>reformas</option>
                  </select>
                  
                  <label htmlFor="input-description">Describe tu trabajo brevemente: </label>
                  <input type="textaera" name="description" id="input-description"  value={this.state.description} onChange={this.handleChangeInput}></input>

                  <p>Selecciona una provincia:</p>
                  <select name="localities" id="input-localities" selected={this.state.localities} onChange={this.handleChangeInput}>
                      <option>selecciona</option>
                      <option value='Albacete'>Albacete</option>
                      <option value='Alicante/Alacant'>Alicante/Alacant</option>
                      <option value='Almería'>Almería</option>
                      <option value='Araba/Álava'>Araba/Álava</option>
                      <option value='Asturias'>Asturias</option>
                      <option value='Ávila'>Ávila</option>
                      <option value='Badajoz'>Badajoz</option>
                      <option value='Barcelona'>Barcelona</option>
                      <option value='Bizkaia'>Bizkaia</option>
                      <option value='Burgos'>Burgos</option>
                      <option value='Cáceres'>Cáceres</option>
                      <option value='Cádiz'>Cadiz</option>
                      <option value='Cantabria'>Cantabria</option>
                      <option value='Castellón/Castelló'>Castellón/Castelló</option>
                      <option value='Ciudad Real'>Ciudad Real</option>
                      <option value='Córdoba'>Córdoba</option>
                      <option value='Coruña, A'>Coruña, A</option>
                      <option value='Cuenca'>Cuenca</option>
                      <option value='Gipuzkoa'>	Gipuzkoa</option>
                      <option value='Girona'>Girona</option>
                      <option value='Granada'>Granada</option>
                      <option value='Guadalajara'>Guadalajara</option>
                      <option value='Huelva'>Huelva</option>
                      <option value='Huesca'>Huesca</option>
                      <option value='Jaén'>Jaén</option>
                      <option value='León'>León</option>
                      <option value='Lleida'>Lleida</option>
                      <option value='Lugo'>Lugo</option>
                      <option value='Madrid'>Madrid</option>
                      <option value='Málaga'>Málaga</option>
                      <option value='Murcia'>Murcia</option>
                      <option value='Navarra'>Navarra</option>
                      <option value='Ourense'>Ourense</option>
                      <option value='Palencia'>	Palencia</option>
                      <option value='Pontevedra'>Pontevedra</option>
                      <option value='Rioja, La'>Rioja, La</option>
                      <option value='Salamanca'>Salamanca</option>
                      <option value='Segovia'>Segovia</option>
                      <option value='Sevilla'>Sevilla</option>
                      <option value='Soria'>Soria</option>
                      <option value='Tarragona'>Tarragona</option>
                      <option value='Teruel'>Teruel</option>
                      <option value='Toledo'>Toledo</option>
                      <option value='Valencia/València'>Valencia/València</option>
                      <option value='Valladolid'>Valladolid</option>
                      <option value='Zamora'>Zamora</option>
                      <option value='Zaragoza'>	Zaragoza</option>
                  </select>
            
                  <label htmlFor="input-img">Por último, añade una foto de perfil</label>
                  <input name="imageUrl" type="file" id="input-img" onChange={this.handleFileUpload} />
                    
                  <button className="submit-btn" type="submit">Actualizar</button>
                  
                  <footer>
                    <small onClick={this.deleteProf}>Darse de baja</small>
                  </footer>
              </form>
          </div>

        </div>
      </div>
    )
  }
}

export default ProfEdit
