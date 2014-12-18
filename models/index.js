var mongoose = require('mongoose');

module.exports = function(server) {
    server.model = {};
    server.mongoose = mongoose.connect('mongodb://localhost:27017/rest-db');

    server.model.Element = require('./elements')(server);
};
