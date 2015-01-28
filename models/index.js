var mongoose = require('mongoose');

module.exports = function(server) {
    server.models = {};
    server.mongoose = mongoose.connect('mongodb://localhost:27017/rest-db');

    server.models.Element = require('./elements')(server);
    server.models.User = require('./user')(server);
};
