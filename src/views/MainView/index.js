import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { NavLink as Link } from 'react-router-dom'
import { inject, observer } from "mobx-react"
// import { replace } from 'react-router-redux'
import './index.scss'

const links = [
  {
    id: 1,
    link: '/tomoon',
    text: '去月球',
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520590629312&di=f82967f179c80520daed2cddf60b1301&imgtype=0&src=http%3A%2F%2Ffiles.colabug.com%2Fforum%2F201608%2F10%2F180802svopgzqngixgjiio.png'
  },
  {
    id: 2,
    link: '/ori',
    text: '奇幻森林',
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520590691088&di=d59c54f7f96725af75ba8380a4213a95&imgtype=0&src=http%3A%2F%2Fi-2.yxdown.com%2F2015%2F4%2F22%2F5d0cc8ac-cb21-4535-ad18-4741f60f7dde.jpg'
  },
  {
    id: 3,
    link: '/pubg',
    text: '绝地求生',
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520590743479&di=ae1c62ce0b878013a6e3f910db0faaf8&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Fe391a4194926c3ac8256b76bc013d74bc1a16cc7.jpg'
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
      <div className='main-view-container'
        style={{
          backgroundImage: `url(${links[active].url})`
        }}>
        <div className='blackboard'>
          <div className='tab-group'>
            {
              links.map(({ id, link, text }, index) => (
                <div key={index}
                  className={active === index ? 'tab active' : 'tab'}
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