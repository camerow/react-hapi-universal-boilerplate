import React, { Component } from "react";
import Octicon from "react-octicon";
import CopyToClipboard from 'react-copy-to-clipboard';
import { format } from "../../lib/phoneNumber";

import "../../assets/style/foundation.min.css";
import "../../assets/style/main.css";

class CopyArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }
  toAnchor(link) {
    // console.log("ANCHOR", "<a href=" + link + ">Text Now</a>");
    if (link !== "") {
      this.setState({
        show: "<a href=" + link + ">Text Now</a>"
      })
    }
  }
  render() {
    const { link } = this.props;
    return (
      <div className="row align-center">
        <div className="large-6 medium-10 small-12 column copy-region">
          <CopyToClipboard text={ link }
            onCopy={ () => this.setState({ copied: true }) }>
            <button
              className="copy-btn float-left"
              data-tooltip={this.state.copied ? "Copied!" : "Click to copy to clipboard."}
              onMouseLeave={ () => this.setState({ copied: false })}>
              <Octicon style={{color: "white"}} name="clippy"></Octicon>
            </button>
          </CopyToClipboard>

          <div className="link-container">
            <code className="center-text">{ this.state.show || link }</code>
          </div>

          <p className="center-text format-options">
            <a onClick={ () => this.setState({ show: null }) } className="format-options-item">URL </a>
            <a onClick={ () => this.toAnchor(link) } className="format-options-item">Tag</a>
          </p>
        </div>
      </div>
    )
  }
}

class InputArea extends Component {
  render() {
    const { formattedNumber } = this.props;
    return (
      <div className="row align-center">
        <div className="small-12 medium-10 large-6 column center-text">

          <input
            placeholder="Phone Number"
            value={ formattedNumber }
            onChange={this.props.onNumberChange}
            id="phone"
            type="text"
            label="input" />
          <br />
          <br />

          <textarea
            onChange={this.props.stringEncode}
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
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: "",
      encodedMessage: "",
      link: ""
    }
  }
  getNumber(e) {
    let number = e.target.value.replace(/[^0-9]/g, '').substring(0, 10);
    this.setState({
      phonenumber: number
    })
  }
  stringEncode(e) {
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
  }
  createSmsLink(phonenumber, encodedMessage) {
    let url = "";

    if(phonenumber) {
      url += "http://zwt.co/sms?t=" + phonenumber;
      if(encodedMessage) {
        url += "&body=" + encodedMessage;
      }
    }
    return url;
  }
  render() {
    return (
      <div className="container">
        <div className="row align-center">
          <div className="small-12 column center-text">

            <a href="//www.zipwhip.com"><img className="main-logo" src="images/greyHorizontalLockUpPNG.png"></img></a>

            <h1>Mobile SMS URL Generator</h1>

          </div>
        </div>

        <InputArea formattedNumber={ format(this.state.phonenumber) } onNumberChange={this.getNumber.bind(this)} stringEncode={this.stringEncode.bind(this)}/>
        <CopyArea link={this.createSmsLink(this.state.phonenumber, this.state.encodedMessage)}/>

      </div>
    )
  }
}

export default App;
