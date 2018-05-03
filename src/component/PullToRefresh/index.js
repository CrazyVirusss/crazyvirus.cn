import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Spinning from './images/spinning.gif'
import './index.scss'

export default class PullToRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: 0,
      distance: 0,
      height: 45,
      maxHeight: 50,
      status: 0, // 1 start 2 ready 3 loading 4 end
      clientY: 0,
      pageY: 0,
      watch: true,
    }
  }

  componentDidMount() {
    const height = this.$el.offsetHeight

    this.setState({ height })
  }

  handleTouchStart = (e) => {
    const touch = e.touches[0]

    if (document.body.scrollTop === 0) {
      this.setState({ from: touch.clientY, status: 1 })
    }
  }

  handleTouchMove = (e) => {
    const { status, from, maxHeight } = this.state
    const { clientY } = e.touches[0]
    // console.log(touch)
    if (status > 0 && clientY > 0) {
      e.preventDefault()
      
      const distance = clientY - from

      this.setState({
        distance: distance > maxHeight ? maxHeight : distance,
        status: distance > maxHeight ? 2 : 1,
        clientY,
      })
    }
  }

  handleTouchEnd = (e) => {
    const { status } = this.state

    if (status === 2) {
      this.handleLoadingList()
    } else {
      this.reset()
    }
  }

  handleLoadingList() {
    const { height } = this.state

    this.setState({ status: 3, distance: height })
    this.props.refresh(this.loadingSuccess.bind(this))
  }

  loadingSuccess() {
    this.setState({ loading: true, status: 4 }, () => {
      setTimeout(function () {
        this.reset();
      }.bind(this), 500);
    })
  }

  reset = () => {
    const { distance } = this.state

    this.setState({
      distance: 0,
      status: 0
    })
  }

  render() {
    const {
      startWord = '下拉刷新',
      readyWord = '松开刷新',
      endWord = '刷新成功',
    } = this.props.tips || {}

    const { children } = this.props

    const { status, loading, distance, height, clientY, from, watch } = this.state

    const contentTranslate = 'translate3d(0, ' + distance + 'px, 0)'

    const contentStyle = {
      transform: contentTranslate,
      WebkitTransform: contentTranslate
    }

    const ptrTranslate = 'translate3d(0, ' + (distance - height) + 'px, 0)'

    const ptrStyle = {
      transform: ptrTranslate,
      WebkitTransform: ptrTranslate
    }
    
    return (
      <div className='wrap'>
        <div className="pull-to-refresh" style={ptrStyle} ref={el => this.$el = el }>
          {
            status === 1
              ? startWord
              : status === 2
                ? readyWord
                : status === 3
                  ? <img width="16" src={Spinning}/>
                  : status === 4 && endWord
          }
        </div>
        <div className={(status !== 1 && status !== 2) ? 'refresh content' : 'content'}
          style={contentStyle}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}>
          {children}
        </div>
        {
          watch &&
          <div className="control-list">
            监控
          <br />
            distance: {distance}
            <br />
            from: {from}
            <br />
            status: {status}
            <br />
            clientY: {clientY}
          </div>
        }
      </div>
    )
  }
}