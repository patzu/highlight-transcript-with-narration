import * as React from "react";
import classnames from "classnames";

import { Props, State } from "./types";
import "./styles.scss";

class NarrationSentence extends React.PureComponent<Props, State> {
  state = {
    isRead: false,
    isReset: false
  };

  componentDidUpdate() {
    const { isRead } = this.state;
    const { resetState } = this.props;

    if (resetState && isRead) {
      this.resetSentenceState();
    }
  }

  onAnimationEnd = () => {
    this.setState({
      isRead: true
    });
  };

  resetSentenceState = () => {
    this.setState({
      isRead: false,
      isReset: true
    });
  };

  render() {
    const { isRead, isReset } = this.state;
    const {
      data: { content, delay, duration }
    } = this.props;

    const highlightStyles = {
      animationDuration: `${duration}ms`,
      animationDelay: `${delay}ms`
    };

    const sentenceClassname = classnames("a-narrationSentence", {
      "-isRead": isRead,
      "-isReset": isRead && isReset
    });

    if (content) {
      return (
        <span
          className={sentenceClassname}
          style={highlightStyles}
          onAnimationEnd={() => this.onAnimationEnd()}
        >
          {content}
        </span>
      );
    }

    return null;
  }
}

export default NarrationSentence;
