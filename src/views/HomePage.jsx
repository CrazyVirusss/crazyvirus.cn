import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { NavLink as Link } from 'react-router-dom'
// import './HomePage.scss'

class HomePage extends Component {
  render() {
    // const { route } = this.props
    console.log(this.props)
    return (
      <div className='homepage-container'>
        hello world
      </div>
    )
  }
}

HomePage.propTypes = {
  route: PropTypes.object
}

export default HomePage
