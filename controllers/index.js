module.exports = function(server) {
    require('./elements')(server);
    require('./authentication')(server);
};
