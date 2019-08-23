import React, { Component } from 'react'
import AuthServices from '../../services/auth.services'

class ProfSignup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', job: 'albañilería', description: '', localities: 'Albacete', spain: '', imageUrl: '' }
    this.authServices = new AuthServices()
  }

  handleChangeInput = e => {

    let {name, value} = e.target

    if (name === 'spain') {
      value = e.target.checked
    } 
    
    this.setState({ [name]: value })
  }


  handleFormSubmit = e => {
    e.preventDefault()

    const {username, email, password, job, description, localities, spain, imageUrl} = this.state

    this.authServices.signupProf({username, email, password, job, description, localities, spain, imageUrl})
    .then((theNewUser) => {

      this.setState({username:'', password: '', email: '', job: '', description: '', localities: '', spain: false, imageUrl: '' })
      this.props.setUser(theNewUser)
      this.props.history.push('/professional/profile')
    
    })
    .catch((err) => console.log('error al mandar la info de registro al back', {err}))
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


  render(){
    return(
      <div className="container">
      <h1>Regístrate:</h1>
        <div className="row">
          
                <form className="col-md-6" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-username">Nombre:</label>
                    <input type="text" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                    
                    <label htmlFor="input-email">Email:</label>
                    <input type="text" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                    
                    <label htmlFor="input-password">Contraseña:</label>
                    <input type="password" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                    
                    <p>¿Qué trabajo realizas?:</p>
                    <select name="job" id="input-job" selected={this.state.job} onChange={this.handleChangeInput} >
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
                    <input type="textaera" name="description" id="input-description" value={this.state.description} onChange={this.handleChangeInput}></input>

                    <p>Selecciona una provincia:</p>
                    <select name="localities" id="input-localities" selected={this.state.localities} onChange={this.handleChangeInput}>
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
                    
                    <p>¿Trabajarías en toda la península?:</p>
                    <label htmlFor="spain-yes">
                      <input type="checkbox" name="spain" id="spain-yes" checked={this.state.spain} onChange={this.handleChangeInput} ></input>
                      Si, sin problema
                    </label>
              
                    <label htmlFor="input-img">Por último, añade una foto de perfil</label>
                    <input name="imageUrl" type="file" id="input-img" onChange={this.handleFileUpload} />
                     
                    <button className="submit-btn" type="submit">Enviar</button>
                </form>

   
        </div>
      </div>
    )
  }
}

export default ProfSignup
