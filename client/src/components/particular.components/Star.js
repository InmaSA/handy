import React, {Component} from 'react'

import PartServices from '../../services/part.services'

// import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class Star extends Component {

  constructor (props) {
    super(props) 
    this.state = {
      wichStar: ''

    }
    this.partServices = new PartServices()
  }

  componentDidMount() {
    console.log(this.props.part.favourites)
    console.log(this.props.prof)
    this.wichOne()
  }

  wichOne() {
    this.props.part.favourites && this.props.part.favourites.includes(this.props.prof) ? 
      this.setState({wichStar: '../../../images/fullStar.svg' })
   :
      this.setState({wichStar: '../../../images/emptyStar.svg' })
    
  }

  toggleStars = () => {

    if (this.props.part.favourites.includes(this.props.prof)) {
      this.partServices.removeFavourites(this.props.part._id, this.props.prof)
      this.setState({wichStar: '../../../images/emptyStar.svg' })
    } else {
      this.partServices.updateFavourites(this.props.part._id, this.props.prof)
      this.setState({wichStar: '../../../images/fullStar.svg' })
    }
    this.props.showToast()
  }

  render() {
    
      return (
        
          // <OverlayTrigger 
          //   placement='bottom'
          //   overlay={
          //       <Tooltip id='tooltip-top'>
          //       Gestiona tus <strong>favoritos</strong>.
          //       </Tooltip>
          //   }
          // >
                          
          this.state.wichStar && <img onClick={this.toggleStars} width="20%" src={this.state.wichStar} alt="star"></img>
                            
          // </OverlayTrigger>
      )

 
  }
}

export default Star