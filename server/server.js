require('babel-core/register')({});

const Hapi = require('hapi');
// Hapi Plugins
const Inert = require("inert");
const Scooter = require("scooter");
const Vision = require("vision");
const HapiReactViews = require('hapi-react-views');

const dateFormat = require('dateformat');
const format = "dd mmm HH:MM:ss";
const qs = require("qs");
const Guid = require("guid");
const routes = require("./routes");
const server = new Hapi.Server();
server.connection({
  host: "localhost",
  port: 8000
});

server.register({
  register: require("hapi-rethinkdb"),
  opts: {
    url: "localhost:28015"
  }
}, (err) => {
  if (err) console.error(err);
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
    path: "../views"
  });
  server.route(routes);

  server.start((err) => {
    if (err) {
      throw (err);
    }

    console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);

  });
})
