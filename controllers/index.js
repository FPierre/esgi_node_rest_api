module.exports = function(server) {
    require('./elements/elements')(server);
    require('./logIn')(server);
    require('./logOut')(server);
    require('./signUp')(server);
};
