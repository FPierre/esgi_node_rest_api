module.exports = function(server) {
    require('./authentication')(server);
    require('./borrows')(server);
    require('./elements')(server);
    require('./restore/restore.js')(server);
    require('./historic/historic.js')(server);
};
