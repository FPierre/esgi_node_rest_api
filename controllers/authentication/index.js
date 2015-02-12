/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */


module.exports = function(server){
    require('./logIn.js')(server);
    require('./logOut.js')(server);
    require('./signUp.js')(server);
};