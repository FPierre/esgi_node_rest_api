/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */


module.exports = function(server){
    require('./create.js')(server);
    require('./delete.js')(server);
    require('./list.js')(server);
    require('./update.js')(server);
};