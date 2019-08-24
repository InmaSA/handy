import React, {Component} from 'react'

import PartServices from '../../services/part.services'

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
  }

  render() {

      return (
        <img onClick={this.toggleStars} width="20%" src={this.state.wichStar} alt="star"></img>
      )

 
  }
}

export default Star