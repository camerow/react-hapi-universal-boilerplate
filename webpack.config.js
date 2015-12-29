// Webpack config file
module.exports = {
  entry: './views/main.jsx',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'google-libphonenumber': '../node_modules/google-libphonenumber/dist/libphonenumber.js'
    },
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ["babel"] },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader : 'url-loader' }
    ]
  },
};
