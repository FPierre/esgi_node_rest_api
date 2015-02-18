/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */


module.exports = function(server){
    server.post('/logout',
        server.middleware.isLoggedIn,
        function(req, res){

            req.session.destroy(callback);

            function callback(err,data)
            {
                res.send(200,{message:"session destroyed"});
            }
        });
};
