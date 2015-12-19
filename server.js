require('babel-core/register')({});

const Hapi = require('hapi');
// Hapi Plugins
const Inert = require("inert");
const Scooter = require("scooter");
const Vision = require("vision");

const dateFormat = require('dateformat');
const format = "dd mmm HH:MM:ss";
const HapiReactViews = require('hapi-react-views');
const Path = require("path");
const qs = require("qs");

const server = new Hapi.Server();
server.connection({
  host: "localhost",
  port: 8000
});

server.register([Inert, Vision, Scooter], (err) => {
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
    handler: (req, reply) => {
      var userAgentData = req.plugins.scooter.toJSON();
      var ua = userAgentData.os.family;
      var redirectURL = "sms:";
      var to = req.query.to || req.query.t;
      var body = req.query.body || req.query.b;

      if (to) {
        redirectURL += to;
        if (body) {
          if (ua === "iOS") {
            // Ios redirect ========================================================
            redirectURL += "&";
          } else {
            // Android and others redirect =========================================
            redirectURL += "?";
          }
          redirectURL += qs.stringify({body: body});
        }
        reply(ua);
        // reply.redirect(redirectURL);

      } else {
        // If no request parameters, serve up the web tool.
        reply.view("index")
      }
    }
  });

  server.start((err) => {
    if (err) {
      throw (err);
    }

    console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);

  });
})
