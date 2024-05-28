import * as React from "react";
import { Props } from "./types";

class AudioPlayer extends React.PureComponent<Props> {
  render() {
    const { handlePlayClick, handlePauseClick, handleEnded } = this.props;

    return (
      <audio
        controls
        src="https://dl.dropboxusercontent.com/s/g047i5gx1ddvz4q/track.mp3"
        onPlaying={handlePlayClick}
        onPause={handlePauseClick}
        onEnded={handleEnded}
      />
    );
  }
}

export default AudioPlayer;
