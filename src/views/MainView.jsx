import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { NavLink as Link } from 'react-router-dom'
import { inject, observer } from "mobx-react"
// import { replace } from 'react-router-redux'
import './MainView.scss'

const links = [
  {
    id: 1,
    link: '/tomoon',
    text: '去月球'
  },
  {
    id: 2,
    link: '/ori',
    text: '奇幻森林'
  },
  {
    id: 3,
    link: '/pubg',
    text: '绝地求生'
  },
]

@inject("store")
@observer
export default class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store.mainview
  }

  routerToTargetTab({ index, link }) {
    const { replace } = this.props.history
    // console.log(this.)
    this.store.checkActive(index)
    replace(link)
  }

  render() {
    const { route } = this.props
    const { active } = this.store
    // console.log(this.props)
    return (
      <div className='main-view-container'>
        <div className='blackboard'>
          <div className='tab-group'>
            {
              links.map(({ id, link, text }, index) => (
                <div key={index}
                  className={ active === index ? 'tab active' : 'tab' }
                  onClick={this.routerToTargetTab.bind(this, { index, link })}>
                  {text}
                </div>
              ))
            }
          </div>
          <div className='view'>
            {renderRoutes(route.childRoutes)}
          </div>
        </div>
      </div>
    )
  }
}

MainView.propTypes = {
  route: PropTypes.object
}