require('babel-core/register')({});

const Hapi = require('hapi');
const dateFormat = require('dateformat');
const format = "dd mmm HH:MM:ss";
const inert = require("inert");
const vision = require("vision");
const HapiReactViews = require('hapi-react-views');
const Path = require("path");

const server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: 8000
});

server.register([inert, vision], (err) => {
  if (err) {
    return console.error("ERROR:", err, err.stack);
  }

  server.views({
    engines: {
      jsx: HapiReactViews
    },
    compileOptions: {
      renderMethod: "renderToString" //optional
    },
    relativeTo: __dirname,
    path: "views"
  });
  // Add a route to serve static assets (CSS, JS, IMG)
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'assets',
        index: ['index.html']
      }
    }
  });

  server.route({
    method: "GET",
    path: "/",
    handler: {
      view: "index"
    }
  });

  server.start((err) => {
    if (err) {
      throw (err);
    }

    console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);

  });
})
