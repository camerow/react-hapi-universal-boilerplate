// Webpack config file
module.exports = {
  entry: './views/main.jsx',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loaders: ["babel"]
      }
    ]
  },
};
