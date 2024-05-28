import * as React from "react";
import { createRef } from "react";

import { Props, State } from "./types";

import AudioPlayer from "../../Atoms/AudioPlayer";
import NarrationParagraph from "../../Molecules/NarrationParagraph";

class NarrationWrapper extends React.PureComponent<Props, State> {
  state = {
    hasPlayed: false,
    hasEnded: false,
    isMuted: false,
    isPlaying: false,
    resetPlayer: false,
    buffered: 0,
    duration: 0
  };

  narrationParagraphRef: { current: any } = createRef();

  handlePlayClick = () => {
    const { hasPlayed, isPlaying, hasEnded } = this.state;
    console.log("handlePlayClick ====");

    // If not currently playing, has not played ever and has not ended, play the audio from start.
    if (!isPlaying && !hasPlayed && !hasEnded) {
      this.setState(
        {
          hasPlayed: true,
          isPlaying: true
        },
        this.narrationParagraphRef.current.startNarration()
      );
    }

    // If not currently playing and has not ended, but has played, resume the audio.
    if (!isPlaying && hasPlayed && !hasEnded) {
      this.setState(
        {
          isPlaying: true
        },
        this.narrationParagraphRef.current.resumeNarration()
      );
    }

    // If playback has finished, replay the audio and reset values.
    if (hasEnded) {
      this.setState(
        {
          hasEnded: false
        },
        this.narrationParagraphRef.current.resetNarration()
      );
    }
  };

  handlePauseClick = () => {
    console.log("handlePauseClick ====");
    this.setState(
      {
        isPlaying: false
      },
      this.narrationParagraphRef.current.pauseNarration()
    );
  };

  handleEnded = () => {
    console.log("ended ====");
    this.setState({
      isPlaying: false,
      hasEnded: true
    });
  };

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <NarrationParagraph data={data} ref={this.narrationParagraphRef} />
        <AudioPlayer
          handlePlayClick={this.handlePlayClick}
          handlePauseClick={this.handlePauseClick}
          handleEnded={this.handleEnded}
        />
      </React.Fragment>
    );
  }
}

export default NarrationWrapper;
