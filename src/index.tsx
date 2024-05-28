import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import mockData from "./mockData";

import convertTimingsToJSON from "./utils/subripToJSON";

import Narration from "./components/Organisms/Narration";

class App extends React.Component {
  state = {
    narrationText: []
  };

  componentDidMount() {
    this.convertData();
  }

  convertData = () => {
    this.setState({
      narrationText: convertTimingsToJSON(mockData)
    });
  };

  render() {
    const { narrationText } = this.state;

    return (
      <div className="App">
        <Narration data={narrationText} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

render(<App />, rootElement);
