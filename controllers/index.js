module.exports = function(server) {
    require('./borrow/borrow')(server);
    require('./elements')(server);
    require('./authentication')(server);
};
