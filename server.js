var Express    = require('express');
var bodyParser = require('body-parser');

var server = Express();

server.use(bodyParser.json());
server.listen(3000);

require('./models')(server);
require('./controllers')(server);

console.log('Magic happens on port 3000');
