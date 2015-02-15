/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */
module.exports = function(server) {
    require('./isLoggedIn.js')(server);
    require('./isAnEmail.js')(server);
};
