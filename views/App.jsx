import React, { Component } from "react";
import Octicon from "react-octicon";
import "../assets/style/foundation.min.css";
import "../assets/style/main.css";

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
            <Octicon style={{color: "white"}} name="clippy"></Octicon>
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
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: "",
      encodedMessage: ""
    }
  }
  handleChange(e) {
    console.log(e.target.value);
  }
  stringEncode(e) {
    // console.log("String Encode", e, e.target);
    const message = e.target.value;
    let body = encodeURIComponent(message);
        body = body.replace(/~/g, "%7E");
        body = body.replace(/!/g, "%21");
        body = body.replace(/\*/g, "%23");
        body = body.replace(/\(/g, "%28");
        body = body.replace(/\)/g, "%29");
        body = body.replace(/'/g, "%27");
    this.setState({
      encodedMessage: body
    });
    console.log("Encoded", body);
  }
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

          <textarea
            onChange={(e) => this.stringEncode(e)}
            placeholder="Message"
            maxLength="160"
            id="message"
            type="text"
            label="input">
          </textarea>

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
