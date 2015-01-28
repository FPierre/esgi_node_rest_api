/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */


module.exports = function(app){
    app.post('/logout',
        app.middleware.isLoggedIn,
        function(req, res){

            req.session.destroy(callback);

            function callback(err,data)
            {
                res.send(200,"session destroyed");
            }
        });
};
