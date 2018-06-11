import React from "react";
import PropTypes from "prop-types";
import "./SelfAudio.scss";
import audioIcon from "./images/audio.png";

export class SelfAudio extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isPlay: false,
      currentTime: 0,
      allTime: 0,
      begin: 0
    };

    this.audioAutoPlay = this.audioAutoPlay.bind(this);
  }

  componentDidMount() {
    const { autoPlay } = this.props;
    const audio = this.audio;

    if (audio && autoPlay) {
      document.addEventListener("DOMContentLoaded", this.audioAutoPlay, {
        once: true
      });
      //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
      document.addEventListener("touchstart", this.audioAutoPlay, {
        once: true
      });
    }
  }

  audioAutoPlay() {
    const audio = this.audio;

    audio.play();

    document.addEventListener("WeixinJSBridgeReady", () => audio.play());
  }

  readyToPlay() {
    const audio = this.audio;
    const { duration } = audio;

    if (audio.duration !== 0) {
      audio.play();
      this.setState({ isPlay: true });
    }
  }

  getCurrentPlayTime() {
    const { currentTime } = this.audio;

    this.setState({ currentTime });
  }

  clickToCheckPlayStatus() {
    const { isPlay } = this.state;

    this.audio[isPlay ? "pause" : "play"]();

    this.setState({ isPlay: !isPlay });
  }

  render() {
    const { source = "http://65.ierge.cn/13/206/412922.mp3" } = this.props;
    const { isPlay } = this.state;

    return (
      <div className="self-audio-play">
        <div
          className={`control ${isPlay ? "self-rotate" : ""}`}
          style={{ backgroundImage: `url(${audioIcon})` }}
          onClick={this.clickToCheckPlayStatus.bind(this)}
        />
        <div className="audio-wrap">
          <audio
            onCanPlay={this.readyToPlay.bind(this)}
            ref={audio => (this.audio = audio)}
            src={source}
          />
        </div>
      </div>
    );
  }
}

SelfAudio.propTypes = {
  source: PropTypes.string
};

export default SelfAudio;
