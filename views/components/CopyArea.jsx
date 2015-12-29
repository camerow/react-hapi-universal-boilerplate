import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Octicon from "react-octicon";

class CopyArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  toAnchor(link) {
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

export default CopyArea;
