module.exports = function(server) {
    require('./borrow.js')(server);
    require('./create.js')(server);
    require('./list.js')(server);
};
