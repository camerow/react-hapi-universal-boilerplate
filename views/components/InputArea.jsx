import React, { Component } from "react";

class InputArea extends Component {
  render() {
    const { formattedNumber, onNumberChange, stringEncode } = this.props;

    return (
      <div className="row align-center">
        <div className="small-12 medium-10 large-6 column center-text">

          <input
            placeholder="Phone Number"
            value={ formattedNumber }
            onChange={onNumberChange}
            id="phone"
            type="text"
            label="input" />
          <br />
          <br />

          <textarea
            onChange={stringEncode}
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

export default InputArea;
