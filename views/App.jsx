import React, { Component } from "react";

require("./style/main.css");
import "../assets/style/foundation.min.css";

class CopyArea extends Component {
  render() {
    return (
      <div className="row align-center">
        <div className="large-6 medium-10 small-12 column copy-region">

          <button
            id="copyUrl"
            onclick="$(this).toClipboard('#result')"
            className="copy-btn float-left"
            data-tooltip="Click to copy to clipboard.">
            <span className="octicon light octicon-clippy"></span>
          </button>

          <div className="link-container">
            <code className="center-text" id="result"></code>
          </div>

          <p className="center-text format-options">
            <a onclick="$(this).toTag()" className="format-options-item">Tag</a>
            <a onclick="updateResult()" className="format-options-item">URL</a>
          </p>
        </div>
      </div>
    )
  }
}
class InputArea extends Component {
  render() {
    return (
      <div className="row align-center">
        <div className="small-12 medium-10 large-6 column center-text">

          <input
            placeholder="Phone Number"
            id="phone"
            type="text"
            label="input" />
          <br />
          <br />

          <textarea onkeyup="textAreaAdjust(this)" placeholder="Message" maxLength="160" id="message" type="text" label="input"></textarea>

        </div>
      </div>
    )
  }
}
class App extends Component {
  render() {
    console.log("APP!");
    return (
      <div className="container">
        <div className="row align-center">
          <div className="small-12 column center-text">

            <a href="//www.zipwhip.com"><img className="main-logo" src="images/greyHorizontalLockUpPNG.png"></img></a>

            <h1>Mobile SMS URL Generator</h1>

          </div>
        </div>

        <InputArea />
        <CopyArea />

      </div>
    )
  }
}

export default App;
