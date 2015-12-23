import React, { Component } from "react";
import { format } from "../../lib/phoneNumber";
import { InputArea, CopyArea } from "./";

import "../../assets/style/foundation.min.css";
import "../../assets/style/main.css";

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
        url += "&b=" + encodedMessage;
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
