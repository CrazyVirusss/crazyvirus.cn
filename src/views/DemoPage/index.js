import React from 'react'
import SelfAudio from './SelfAudio'

export default class DemoPage extends React.Component {
  render() {
    return (
      <div className="demo-page">
        <SelfAudio autoPlay={true}/>
      </div>
    )
  }
}