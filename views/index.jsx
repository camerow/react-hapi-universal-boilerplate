// Default layout template
var React = require('react');

var Default = React.createClass({

  render: function() {

    return(
      <html>
      <head>
        <title>SMS Redirect</title>

        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="shortcut icon" type="image/png" href="images/favicon.png"/>
        <script src="https://use.typekit.net/jfn8oeh.js"></script>
      </head>
      <body>
        <div id="app"></div>
        <script src="js/bundle.js"></script>
      </body>
      </html>
    );
  }
});

module.exports = Default;
