/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */


module.exports = function (app) {

    app.get('/', function (req, res) {
        req.session.login = ''
        //req.session.destroy(); // makes mongoose-session fail
        res.send('200');
    });




}

module.exports = function(app){
    app.server.post('/logout',
        app.middleware.authenticated,
        function(req, res){

            req.sessionID.destroy(callback);

            function callback(err,data)
            {
                res.send();
            }
        });
};
