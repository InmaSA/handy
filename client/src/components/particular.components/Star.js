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
    this.wichOne()
  }

  wichOne() {
    
    if (this.props.part.favourites.includes(this.props.prof)) {
      this.setState({wichStar: '../../../images/fullStar.svg' })
    }  else {
      this.setState({wichStar: '../../../images/emptyStar.svg' })
    }
  }

  toggleStars = () => {

    if (this.props.part.favourites.includes(this.props.prof)) {
      this.setState({wichStar: '../../../images/emptyStar.svg' })
      this.partServices.removeFavourites(this.props.part._id, this.props.prof)
    } else {
      this.setState({wichStar: '../../../images/fullStar.svg' })
      this.partServices.updateFavourites(this.props.part._id, this.props.prof)
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
                          
            <img onClick={this.toggleStars} width="20%" src={this.state.wichStar} alt="star"></img>
                            
// {/*                           
//           </OverlayTrigger> */}
      )

 
  }
}

export default Star