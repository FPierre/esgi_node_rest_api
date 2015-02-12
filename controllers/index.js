module.exports = function(server) {
    require('./authentication')(server);
    require('./borrows')(server);
    require('./elements')(server);
};
