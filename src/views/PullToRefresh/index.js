import React, { Component } from 'react'
import { PullToRefresh } from '../../component'

const range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i)

export default class Refresh extends Component {

  constructor() {
    super()
    this.state = {
      index: 0,
      list: []
    }
  }

  componentWillMount() {
    this.getListItem()
  }

  sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec))
  }
  
  getListItem = async (cb) => {
    const { index, list } = this.state
    const upNum = index + 10
    const result = range(index, upNum)

    await this.sleep(1000)
    
    this.setState({
      index: upNum,
      list: result
    })

    cb && cb()
  }

  render() {
    const { list } = this.state

    return (
      <div className='test-pull-to-refresh-container'>
        <PullToRefresh refresh={this.getListItem}>
          <div>
            {
              list.map((val, index) => (
                <div style={{ display: 'block', padding: '5px 0', textAlign: 'center' }} key={index}>{val}</div>
              ))
            }
          </div>
        </PullToRefresh>
      </div>
    )
  }
}