var routes = [{
  // Add a route to serve static assets (CSS, JS, IMG)
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'assets',
      index: ['index.html']
    }
  }
}, {
  method: "GET",
  path: "/",
  handler: (req, reply) => {
    var r = req.server.plugins['hapi-rethinkdb'].rethinkdb;
    var conn = req.server.plugins['hapi-rethinkdb'].connection;

    var userAgentData = req.plugins.scooter.toJSON();
    var ua = userAgentData.os.family;
    var redirectURL = "sms:";
    var to = req.query.to || req.query.t;
    var body = req.query.body || req.query.b;

    if (to) {
      redirectURL += to;
      if (body) {
        if (ua === "iOS") {
          // Ios redirect ===========================
          redirectURL += "&";
        } else {
          // Android and others redirect ============
          redirectURL += "?";
        }
        redirectURL += qs.stringify({ body: body });
      }
      // reply(ua);
      reply.redirect(redirectURL);

    } else {
      // If no request parameters, serve up the web tool.
      reply.view("index")
    }
  }
}];

module.exports = routes;
