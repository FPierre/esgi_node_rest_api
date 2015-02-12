var Express    = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var server = Express();
server.use(bodyParser.json());
server.use(session({
        secret: 'S3CR3T',
        resave: true,
        saveUninitialized: true,
        key: 'session',
        store: new MongoStore({
            db : 'rest-db'
        })
    })
);

server.referenceModel = {};
server.referenceModel.Users = "users";
server.referenceModel.Elements = "Element"

server.totalElements =  [];

require('./models')(server);
require('./middleware')(server);
require('./controllers')(server);


server.listen(3000);

console.log('Magic happens on port 3000');
