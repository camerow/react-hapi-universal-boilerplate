// Webpack config file
module.exports = {
  entry: './views/main.jsx',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ["babel"]
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test   : /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader : 'url-loader'
      }
    ]
  },
};
